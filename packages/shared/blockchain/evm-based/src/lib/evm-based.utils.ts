import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, EvmBasedBlockchain, getDerivationPath } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { CreateRecord, Currency, TronWallet } from '@tatumio/api-client'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei, Unit } from 'web3-utils'
import { SdkError, SdkErrorCode, toHexString, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { Erc20Token } from './contracts'
import { CELO_CONSTANTS, EvmBasedWeb3 } from './services/evm-based.web3'
import { EvmBasedSdkError } from './evm-based.sdk.errors'
import { TransactionConfigWithFeeCurrency } from './transactions/smartContract'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'

export const evmBasedUtils = {
  generateAddressFromXPub: (xpub: string, i: number): string => {
    const w = ethHdKey.fromExtendedKey(xpub)
    const wallet = w.deriveChild(i).getWallet()
    return ADDRESS_PREFIX.EVM + wallet.getAddress().toString('hex').toLowerCase()
  },
  generatePrivateKeyFromMnemonic: async (
    blockchain: EvmBasedBlockchain,
    mnemonic: string,
    i: number,
    options?: { testnet: boolean },
  ): Promise<string> => {
    const derivationPath = getDerivationPath(blockchain, options)
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
    const derivePath = hdwallet.derivePath(derivationPath).deriveChild(i)
    return derivePath.getWallet().getPrivateKeyString()
  },
  generateAddressFromPrivateKey: (blockchain: EvmBasedBlockchain, privateKey: string): string => {
    const wallet = ethWallet.fromPrivateKey(Buffer.from(privateKey.replace(ADDRESS_PREFIX.EVM, ''), 'hex'))
    return wallet.getAddressString() as string
  },
  generateBlockchainWallet: async (
    blockchain: EvmBasedBlockchain,
    mnemonic?: string,
    options?: { testnet: boolean },
  ): Promise<TronWallet> => {
    const mnem = mnemonic ?? generateMnemonic(256)
    const derivationPath = getDerivationPath(blockchain, options)
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
    const derivePath = hdwallet.derivePath(derivationPath)
    return {
      xpub: derivePath.publicExtendedKey().toString(),
      mnemonic: mnem,
    }
  },
  prepareSignedTransactionAbstraction: async (
    client: Web3,
    transaction: TransactionConfig,
    web3: EvmBasedWeb3,
    signatureId?: string,
    fromPrivateKey?: string,
    gasLimit?: string,
    gasPrice?: string,
    provider?: string,
  ) => {
    const gasPriceDefined = gasPrice
      ? client.utils.toWei(gasPrice, 'gwei')
      : await web3.getGasPriceInWei(provider)
    const tx: TransactionConfig = {
      from: 0,
      gas: gasLimit,
      ...transaction,
      gasPrice: gasPriceDefined,
    }

    if (signatureId) {
      return JSON.stringify(tx)
    }

    tx.from = tx.from || client.eth.defaultAccount || 0
    tx.gas = gasLimit ?? (await client.eth.estimateGas(tx))

    if (!fromPrivateKey) {
      throw new Error('signatureId or fromPrivateKey has to be defined')
    }
    const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

    if (!signedTransaction.rawTransaction) {
      throw new Error('Unable to get signed tx data')
    }

    return signedTransaction.rawTransaction
  },
  prepareSignedTransactionAbstractionCelo: async (
    client: Web3,
    transaction: TransactionConfigWithFeeCurrency,
    web3: EvmBasedWeb3,
    signatureId?: string,
    fromPrivateKey?: string,
    gasLimit?: string,
    gasPrice?: string,
    provider?: string,
  ) => {
    const p = new CeloProvider(provider)
    const network = await p.ready

    let currentGasPrice
    if (transaction.gasPrice) {
      currentGasPrice =
        transaction.gasPrice instanceof BN
          ? transaction.gasPrice
          : `0x${new BigNumber(toWei(transaction.gasPrice as string, 'gwei')).toString(16)}`
    }

    const celoTransaction: any = {
      chainId: network.chainId,
      feeCurrency: transaction.feeCurrency,
      nonce: transaction.nonce,
      gasLimit: gasLimit ? `0x${new BigNumber(gasLimit).toString(16)}` : undefined,
      gasPrice: currentGasPrice,
      to: transaction.to,
      data: transaction.data,
    }

    if (signatureId) {
      return JSON.stringify(celoTransaction)
    }

    if (!fromPrivateKey) {
      throw new Error('signatureId or fromPrivateKey has to be defined')
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)

    const walletInfo = await obtainWalletInformation(wallet, transaction.feeCurrency)

    celoTransaction.nonce = transaction.nonce || walletInfo.txCount
    celoTransaction.from = walletInfo.from

    const gasLimitDefined =  (await wallet.estimateGas(celoTransaction))
      .add(evmBasedUtils.isCeloAddress(transaction.feeCurrency) ? 0 : 100000)
    celoTransaction.gasLimit = gasLimitDefined? gasLimitDefined.toHexString(): celoTransaction.gasLimit
    return wallet.signTransaction(celoTransaction)
  },

  isCeloAddress: (address?: string) => {
    return address === CELO_CONSTANTS.CELO_ADDRESS_TESTNET || address === CELO_CONSTANTS.CELO_ADDRESS_MAINNET
  },

  transformToWei: (amount: string, unit = 'ether') => {
    return toWei(amount, unit as Unit)
  },

  amountToWeiHex: (amount: string, unit = 'ether') => toHex(evmBasedUtils.transformToWei(amount, unit)),

  decimals: async (contractAddress: string, web3: EvmBasedWeb3, provider?: string) => {
    const client = web3.getClient(provider)

    return new client.eth.Contract(Erc20Token.abi as any, contractAddress).methods.decimals().call()
  },
  gasLimitToHexWithFallback: (gasLimit?: string, fallback?: string) =>
    gasLimit ? toHexString(new BigNumber(gasLimit)) : fallback,

  gasPriceWeiToHexWithFallback: (gasPrice?: string, fallback?: BN) =>
    gasPrice ? toHexString(new BigNumber(toWei(gasPrice, 'gwei'))) : fallback,
  storeDataTransaction: async (
    body: StoreDataTransactionBody & { signatureId?: string },
    web3: EvmBasedWeb3,
    provider?: string,
  ) => {
    const client = web3.getClient(provider, body.fromPrivateKey)

    const hexData = isHex(body.data) ? stringToHex(body.data) : toHex(body.data)

    const tx: TransactionConfig = {
      from: 0,
      to: body.to || client.eth.accounts.wallet[0].address,
      data: hexData,
      gas: body.gasLimit,
      nonce: body.nonce,
      gasPrice: body.gasPrice
        ? `0x${new BigNumber(toWei(body.gasPrice, 'gwei')).toString(16)}`
        : await web3.getGasPriceInWei(),
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      body.signatureId,
      body.fromPrivateKey,
      body.gasLimit,
      body.gasPrice,
    )
  },
  tryCatch: async (method: () => any, code: SdkErrorCode) => {
    try {
      return await method()
    } catch (e) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new EvmBasedSdkError({ error: e as Error, code })
    }
  },
}

export type StoreDataTransactionBody = WithoutChain<CreateRecord> & {
  signatureId?: string
  gasLimit?: string
  gasPrice?: string
}

const obtainWalletInformation = async (wallet: CeloWallet, feeCurrencyContractAddress?: string) => {
  const [txCount, from] = await Promise.all([
    wallet.getTransactionCount(),
    wallet.getAddress(),
  ])
  return {
    txCount,
    from,
  }
}
