import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, EvmBasedBlockchain, getDerivationPath } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { CreateRecord, Wallet } from '@tatumio/api-client'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei, Unit } from 'web3-utils'
import { SdkError, SdkErrorCode, toHexString, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { Erc20Token } from './contracts'
import { EvmBasedWeb3 } from './services/evm-based.web3'
import { EvmBasedSdkError } from './evm-based.sdk.errors'

export const evmBasedUtils = {
  generateAddressFromXPub: (xpub: string, i: number, prefix = ADDRESS_PREFIX.EVM): string => {
    const w = ethHdKey.fromExtendedKey(xpub)
    const wallet = w.deriveChild(i).getWallet()
    return prefix + wallet.getAddress().toString('hex').toLowerCase()
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
  generateAddressFromPrivateKey: (
    blockchain: EvmBasedBlockchain,
    privateKey: string,
    prefix = ADDRESS_PREFIX.EVM,
  ): string => {
    const wallet = ethWallet.fromPrivateKey(Buffer.from(privateKey.replace(prefix, ''), 'hex'))
    return wallet.getAddressString() as string
  },
  generateBlockchainWallet: async (
    blockchain: EvmBasedBlockchain,
    mnemonic?: string,
    options?: { testnet: boolean },
  ): Promise<Required<Wallet>> => {
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
      ...transaction,
      gas: gasLimit,
      gasPrice: gasPriceDefined,
    }

    if (signatureId) {
      return JSON.stringify(tx)
    }

    tx.from = tx.from || client.eth.defaultAccount || 0
    tx.gas = tx.gas ?? (await client.eth.estimateGas(tx))

    if (!fromPrivateKey) {
      throw new Error('signatureId or fromPrivateKey has to be defined')
    }

    await evmBasedUtils.validateSenderBalance(client, fromPrivateKey, tx)

    const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

    if (!signedTransaction.rawTransaction) {
      throw new Error('Unable to get signed tx data')
    }

    return signedTransaction.rawTransaction
  },

  validateErc20Balance: async (
    client: Web3,
    privateKey: string,
    contractAddress: string,
    tx: TransactionConfig,
  ) => {
    const { value } = tx

    const account = client.eth.accounts.privateKeyToAccount(privateKey)
    const contract = new client.eth.Contract(Erc20Token.abi as any, contractAddress)
    const balance = await contract.methods.balanceOf(account.address).call()

    if (!balance || new BigNumber(balance).isLessThan(value as string)) {
      throw new EvmBasedSdkError({
        code: SdkErrorCode.INSUFFICIENT_FUNDS,
        error: new Error(
          `Insufficient funds burn erc20 transaction from account ${
            account.address
          } -> available balance is ${balance}, required balance is ${value as string}`,
        ),
      })
    }
  },

  validateSenderBalance: async (client: Web3, privateKey: string, tx: TransactionConfig) => {
    const { gas, gasPrice, nonce, ...txWithoutGas } = tx
    let estimate: BigNumber
    try {
      estimate = new BigNumber(await client.eth.estimateGas(txWithoutGas))
    } catch (e) {
      if (!gas) {
        throw new EvmBasedSdkError({
          code: SdkErrorCode.EVM_TRANSACTION_ERROR,
          error: new Error(`Unable to estimate gas. transaction ${tx}, returned with error ${e}`),
        })
      }
      estimate = new BigNumber(gas as string)
    }
    let threshold = estimate.multipliedBy(new BigNumber(tx.gasPrice as string))
    if (tx.value) {
      threshold = threshold.plus(tx.value as string)
    }
    const account = client.eth.accounts.privateKeyToAccount(privateKey)
    const balance = await client.eth.getBalance(account.address)
    if (!balance || new BigNumber(balance).isLessThan(threshold)) {
      throw new EvmBasedSdkError({
        code: SdkErrorCode.INSUFFICIENT_FUNDS,
        error: new Error(
          `Insufficient funds send transaction from account ${account.address} -> available balance is ${balance}, required balance is ${threshold}`,
        ),
      })
    }
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
        : await web3.getGasPriceInWei(provider),
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      body.signatureId,
      body.fromPrivateKey,
      body.gasLimit,
      body.gasPrice,
      provider,
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

// @TODO fix typing issue
export type AddressTransformer = (address: any) => any
export const AddressTransformerDefault = (address: any) => address
