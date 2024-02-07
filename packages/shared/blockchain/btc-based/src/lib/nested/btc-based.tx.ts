import {
  ApiServices,
  BlockchainFeesService,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
  ChainUtxoEnum,
  Currency,
  DataApiService,
  EstimateFeeFromUTXO,
  FeeBtcBased,
  LtcTransactionAddress,
  LtcTransactionAddressKMS,
  LtcTransactionUTXO,
  LtcTransactionUTXOKMS,
  LtcUTXO,
  TransactionHash,
} from '@tatumio/api-client'
import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import { amountUtils, SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BtcBasedSdkError } from '../btc-based.sdk.errors'
import BigNumber from 'bignumber.js'
import { BtcBasedWalletUtils } from '../btc-based.wallet.utils'
import { BtcBasedFromUtxoReplaceableTypes } from './btc-based.types'

interface BtcBasedTransaction extends Transaction {
  serialize(unchecked?: boolean): string
}

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: BtcBasedTxOptions) => Promise<TransactionHash>
  prepareSignedTransaction: (body: T, options: BtcBasedTxOptions) => Promise<string>
  prepareSignedReplaceableTransaction: (
    body: BtcBasedFromUtxoReplaceableTypes,
    options: BtcBasedTxOptions,
  ) => Promise<string>
}

export type BtcTransactionTypes =
  | BtcTransactionFromAddress
  | BtcTransactionFromAddressKMS
  | BtcTransactionFromUTXO
  | BtcTransactionFromUTXOKMS

export type LtcTransactionTypes =
  | LtcTransactionAddress
  | LtcTransactionAddressKMS
  | LtcTransactionUTXO
  | LtcTransactionUTXOKMS

type BtcBasedTransactionTypes = BtcTransactionTypes | LtcTransactionTypes

export type BtcFromAddressTypes = BtcTransactionFromAddress | BtcTransactionFromAddressKMS

export type LtcFromAddressTypes = LtcTransactionAddress | LtcTransactionAddressKMS

export type BtcFromUtxoTypes = BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS
export type LtcFromUtxoTypes = LtcTransactionUTXO | LtcTransactionUTXOKMS

export type BtcBasedFromWithChange = BtcTransactionFromAddress | LtcTransactionAddress
export type BtcBasedFromWithKmsChange = BtcTransactionFromAddressKMS | LtcTransactionAddressKMS
export type BtcBasedUtxoWithChange = BtcTransactionFromUTXO | LtcTransactionUTXO
export type BtcBasedUtxoKMSWithChange = BtcTransactionFromUTXOKMS | LtcTransactionUTXOKMS

type GetUtxoType =
  | typeof ApiServices.blockchain.bitcoin.btcGetUtxo
  | typeof ApiServices.blockchain.ltc.ltcGetUtxo

export type GetUtxoBatchType =
  | ((chain: ChainUtxoEnum, utxos: BtcBasedUtxo[]) => Promise<BtcUTXO[]>)
  | ((chain: ChainUtxoEnum, utxos: BtcBasedUtxo[]) => Promise<LtcUTXO[]>)

type BroadcastType =
  | typeof ApiServices.blockchain.bitcoin.btcBroadcast
  | typeof ApiServices.blockchain.ltc.ltcBroadcast

type BtcBasedTxOptions = { testnet: boolean; skipAllChecks?: boolean }

export type BtcBasedUtxo = {
  txHash: string
  index: number
}

export const btcBasedTransactions = (
  currency: Currency.BTC | Currency.LTC,
  utils: BtcBasedWalletUtils,
  apiCalls: {
    getUTXOsByAddress: typeof DataApiService.getUtxosByAddress
    getUtxo: GetUtxoType
    getUtxoBatch?: GetUtxoBatchType
    broadcast: BroadcastType
    estimateFee: typeof BlockchainFeesService.estimateFeeBlockchain
  },
  {
    createTransaction,
    createPrivateKey,
    prepareUnspentOutput,
    scriptFromAddress,
  }: {
    createTransaction: typeof Transaction
    createPrivateKey: typeof PrivateKey
    prepareUnspentOutput: typeof Transaction.UnspentOutput.fromObject
    scriptFromAddress: typeof Script.fromAddress
  } = {
    createTransaction: Transaction,
    createPrivateKey: PrivateKey,
    prepareUnspentOutput: Transaction.UnspentOutput.fromObject,
    scriptFromAddress: Script.fromAddress,
  },
): BtcBasedTx<BtcBasedTransactionTypes> => {
  const getChain = (options: BtcBasedTxOptions) => {
    if (currency === Currency.LTC) {
      if (options.testnet) {
        return 'litecoin-testnet'
      } else {
        return 'litecoin'
      }
    } else {
      if (options.testnet) {
        return 'bitcoin-testnet'
      } else {
        return 'bitcoin'
      }
    }
  }

  const privateKeysFromAddress = async (
    transaction: BtcBasedTransaction,
    body: BtcFromAddressTypes | LtcFromAddressTypes,
    options: BtcBasedTxOptions,
  ): Promise<Array<string>> => {
    if (body.fromAddress.length === 0 && !options.skipAllChecks) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS)
    }

    let totalInputs = 0
    let totalOutputs = body.fee ? amountUtils.toSatoshis(body.fee) : 0
    for (const item of transaction.outputs) {
      totalOutputs += item.satoshis
    }
    try {
      const privateKeysToSign = []

      for (const item of body.fromAddress) {
        if (totalInputs >= totalOutputs) {
          break
        }

        const utxos = await apiCalls.getUTXOsByAddress(
          getChain(options),
          item.address,
          amountUtils.fromSatoshis(totalOutputs - totalInputs),
        )
        for (const utxo of utxos) {
          totalInputs += utxo.value
          transaction.from([
            prepareUnspentOutput({
              txId: utxo.txHash,
              outputIndex: utxo.index,
              script: scriptFromAddress(utxo.address).toString(),
              satoshis: amountUtils.toSatoshis(utxo.value),
            }),
          ])

          if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
          else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
        }
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  async function getUtxoBatch(
    chain: ChainUtxoEnum,
    body: BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS | LtcTransactionUTXO | LtcTransactionUTXOKMS,
  ) {
    const fromUTXO = body.fromUTXO
    if (apiCalls.getUtxoBatch) {
      return apiCalls.getUtxoBatch(
        chain,
        fromUTXO.map((item) => ({ txHash: item.txHash, index: item.index })),
      )
    } else {
      const utxos: (BtcUTXO | null)[] | (LtcUTXO | null)[] = []
      for (const utxoItem of fromUTXO) {
        const utxo = await getUtxoSilent(utxoItem.txHash, utxoItem.index)
        if (utxo === null || !utxo.address) {
          utxos.push(null)
        } else {
          utxos.push(utxo)
        }
      }
      return utxos
    }
  }

  const privateKeysFromUTXO = async (
    transaction: Transaction,
    body: BtcFromUtxoTypes | LtcFromUtxoTypes,
    options: BtcBasedTxOptions,
  ): Promise<Array<string>> => {
    if (body.fromUTXO.length === 0 && !options.skipAllChecks) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS)
    }

    try {
      const privateKeysToSign = []
      const utxos: BtcUTXO[] = []

      const filteredUtxos = await getUtxoBatch(getChain(options), body)

      for (let i = 0; i < filteredUtxos.length; i++) {
        const utxo = filteredUtxos[i]
        if (utxo === null || !utxo.address) continue

        const utxoItem = body.fromUTXO[i]

        utxos.push(utxo)

        transaction.from([
          prepareUnspentOutput({
            txId: utxo.hash,
            outputIndex: utxo.index,
            script: scriptFromAddress(utxo.address).toString(),
            satoshis: utxo.value,
          }),
        ])

        if ('signatureId' in utxoItem) privateKeysToSign.push(utxoItem.signatureId)
        else if ('privateKey' in utxoItem) privateKeysToSign.push(utxoItem.privateKey)
      }

      if (!options.skipAllChecks) {
        await validateBalanceFromUTXO(body, utxos)
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const privateKeysFromUTXONoChecks = async (
    transaction: Transaction,
    body: BtcBasedFromUtxoReplaceableTypes,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []

      for (let i = 0; i < body.fromUTXO.length; i++) {
        const utxo = body.fromUTXO[i]

        transaction.from([
          prepareUnspentOutput({
            txId: utxo.txHash,
            outputIndex: utxo.index,
            script: scriptFromAddress(utxo.address).toString(),
            satoshis: amountUtils.toSatoshis(utxo.value),
          }),
        ])

        if ('signatureId' in utxo) privateKeysToSign.push(utxo.signatureId)
        else if ('privateKey' in utxo) privateKeysToSign.push(utxo.privateKey)
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const validateBalanceFromUTXO = async (
    body: BtcTransactionTypes | LtcTransactionTypes,
    utxos: BtcUTXO[] | LtcUTXO[],
  ) => {
    const totalBalance = utxos.reduce((sum, u) => sum.plus(new BigNumber(u.value ?? 0)), new BigNumber(0))

    const totalFee = body.fee ? new BigNumber(body.fee) : await getEstimateFeeFromUtxo(body, utxos)

    const totalValue = body.to.reduce((sum, t) => sum.plus(new BigNumber(t.value)), new BigNumber(0))

    if (totalBalance.isLessThan(totalValue.plus(totalFee))) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
    }
  }

  const getEstimateFeeFromUtxo = async (
    body: BtcTransactionTypes | LtcTransactionTypes,
    utxos: BtcUTXO[] | LtcUTXO[],
  ): Promise<BigNumber> => {
    const fromUTXO = utxos.map((utxo) => ({ txHash: utxo.hash, index: utxo.index }))
    const fee = (await apiCalls.estimateFee({
      chain: currency,
      type: 'TRANSFER',
      fromUTXO,
      to: body.to,
    } as EstimateFeeFromUTXO)) as FeeBtcBased
    return new BigNumber(fee.slow ?? 0)
  }

  async function getUtxoSilent(hash: string, i: number): Promise<BtcUTXO | LtcUTXO | null> {
    try {
      return await apiCalls.getUtxo(hash, i)
    } catch (e) {
      return null
    }
  }

  const prepareSignedTransaction = async function (
    body: BtcBasedTransactionTypes,
    options: BtcBasedTxOptions,
  ): Promise<string> {
    try {
      const tx: BtcBasedTransaction = new createTransaction()
      let privateKeysToSign: string[] = []

      if (body.changeAddress) {
        tx.change(body.changeAddress)
      }
      if (body.fee) {
        tx.fee(amountUtils.toSatoshis(body.fee))
      }
      body.to.forEach((to) => {
        tx.to(to.address, amountUtils.toSatoshis(to.value))
      })

      if ('fromAddress' in body) {
        privateKeysToSign = await privateKeysFromAddress(tx, body, options)

        const fromAddress = body.fromAddress
        if (fromAddress && 'signatureId' in fromAddress[0] && fromAddress[0].signatureId) {
          if (!options.skipAllChecks) {
            verifyAmounts(tx, body)
          }
          return JSON.stringify(tx)
        }
      } else if ('fromUTXO' in body) {
        privateKeysToSign = await privateKeysFromUTXO(tx, body, options)

        const fromUTXO = body.fromUTXO
        if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
          if (!options.skipAllChecks) {
            verifyAmounts(tx, body)
          }
          return JSON.stringify(tx)
        }
      }

      new Set(privateKeysToSign).forEach((key) => {
        tx.sign(new createPrivateKey(key))
      })

      const ltcSerialization = currency === Currency.LTC //TODO some troubles in signing LTC?
      if (ltcSerialization && !options.skipAllChecks) {
        verifyAmounts(tx, body)
      }

      return tx.serialize(ltcSerialization || options.skipAllChecks)
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const prepareSignedReplaceableTransaction = async function (
    body: BtcBasedFromUtxoReplaceableTypes,
  ): Promise<string> {
    try {
      const tx: BtcBasedTransaction = new createTransaction()

      if (body.changeAddress) {
        tx.change(body.changeAddress)
      }
      if (body.fee) {
        tx.fee(amountUtils.toSatoshis(body.fee))
      }
      body.to.forEach((to) => {
        tx.to(to.address, amountUtils.toSatoshis(to.value))
      })

      const privateKeysToSign: string[] = await privateKeysFromUTXONoChecks(tx, body)

      tx.enableRBF()
      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify(tx)
      }

      new Set(privateKeysToSign).forEach((key) => {
        tx.sign(new createPrivateKey(key))
      })

      return tx.serialize(true)
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const verifyAmounts = (tx: Transaction, body: BtcBasedTransactionTypes) => {
    const outputsSum: BigNumber = body.to
      .map((to) => amountUtils.toSatoshis(to.value))
      .reduce((e, acc) => e.plus(acc), new BigNumber(0))

    const inputsSum: BigNumber = tx.inputs
      .map((i: any) => new BigNumber(i.output.satoshis))
      .reduce((v: BigNumber, acc: BigNumber) => v.plus(acc), new BigNumber(0))

    if (outputsSum.eq(inputsSum)) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
    }

    if (outputsSum.gt(inputsSum)) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
    }
  }

  const sendTransaction = async function (
    body: BtcBasedTransactionTypes,
    options: BtcBasedTxOptions,
  ): Promise<TransactionHash> {
    return apiCalls.broadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  return {
    /**
     * Send bitcoin based transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain
     */
    sendTransaction,
    /**
     * Prepare a signed bitcoin based transaction with the private key locally. Nothing is broadcasted to the blockchain.
     * @returns raw transaction data in hex, to be broadcasted to blockchain.
     */
    prepareSignedTransaction,
    /**
     * Prepare a signed replaceable (RBF) bitcoin based transaction with the private key locally. Nothing is broadcasted to the blockchain.
     * All validations of tx will be skipped, just preparing tx data
     * @returns raw transaction data in hex, to be broadcasted to blockchain.
     */
    prepareSignedReplaceableTransaction,
  }
}
