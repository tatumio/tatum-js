import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, EvmBasedBlockchain, getDerivationPath } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { CreateRecord, TronWallet } from '@tatumio/api-client'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei, Unit } from 'web3-utils'
import { toHexString, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { Erc20Token } from './contracts'
import { EvmBasedWeb3 } from './services/evm-based.web3'

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
  ) => {
    const gasPriceDefined = gasPrice ? client.utils.toWei(gasPrice, 'gwei') : await web3.getGasPriceInWei()
    const tx = {
      ...transaction,
      gasPrice: gasPriceDefined,
    }

    if (signatureId) {
      return JSON.stringify(tx)
    }

    if (!fromPrivateKey) {
      throw new Error('signatureId or fromPrivateKey has to be defined')
    }

    tx.gas = gasLimit ?? (await client.eth.estimateGas(tx))
    tx.from = tx.from || client.eth.defaultAccount || 0
    const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

    if (!signedTransaction.rawTransaction) {
      throw new Error('Unable to get signed tx data')
    }

    return signedTransaction.rawTransaction
  },

  transformAmount: (amount: string, unit = 'ether') => {
    return toWei(amount, unit as Unit)
  },

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
}

export type StoreDataTransactionBody = WithoutChain<CreateRecord> & {
  signatureId?: string
  gasLimit?: string
  gasPrice?: string
}
