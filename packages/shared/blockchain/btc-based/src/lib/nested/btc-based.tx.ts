import {
  ApiServices,
  BlockchainFeesService,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
  Currency,
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

interface BtcBasedTransaction extends Transaction {
  serialize(unchecked?: boolean): string
}

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: BtcBasedTxOptions) => Promise<TransactionHash>
  prepareSignedTransaction: (body: T, options: BtcBasedTxOptions) => Promise<string>
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

type GetTxByAddressType =
  | typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
  | typeof ApiServices.blockchain.ltc.ltcGetTxByAddress

type GetUtxoType =
  | typeof ApiServices.blockchain.bitcoin.btcGetUtxo
  | typeof ApiServices.blockchain.ltc.ltcGetUtxo

type BroadcastType =
  | typeof ApiServices.blockchain.bitcoin.btcBroadcast
  | typeof ApiServices.blockchain.ltc.ltcBroadcast

type BtcBasedTxOptions = { testnet: boolean; skipAllChecks?: boolean }

export const btcBasedTransactions = (
  currency: Currency.BTC | Currency.LTC,
  utils: BtcBasedWalletUtils,
  apiCalls: {
    getTxByAddress: GetTxByAddressType
    getUtxo: GetUtxoType
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
  const privateKeysFromAddress = async (
    transaction: BtcBasedTransaction,
    body: BtcFromAddressTypes | LtcFromAddressTypes,
    options: BtcBasedTxOptions,
  ): Promise<Array<string>> => {
    if (body.fromAddress.length === 0 && !options.skipAllChecks) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS)
    }

    try {
      const privateKeysToSign = []

      const utxos: BtcUTXO[] | LtcUTXO[] = []

      for (const item of body.fromAddress) {
        const txs = await apiCalls.getTxByAddress(item.address, 50, 0, 'incoming') // @TODO OPENAPI remove pageSize

        for (const tx of txs) {
          if (!tx.outputs || !tx.hash) continue

          for (const [i, o] of tx.outputs.entries()) {
            if (o.address !== item.address) {
              continue
            }

            const utxo = await getUtxoSilent(tx.hash, i)
            if (utxo === null) {
              continue
            }
            utxos.push(utxo)

            transaction.from([
              prepareUnspentOutput({
                txId: tx.hash,
                outputIndex: i,
                script: scriptFromAddress(o.address).toString(),
                satoshis: utxo.value,
              }),
            ])

            if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
            else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
          }
        }
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
      const utxos = []

      for (const utxoItem of body.fromUTXO) {
        const utxo = await getUtxoSilent(utxoItem.txHash, utxoItem.index)
        if (utxo === null || !utxo.address) continue

        utxos.push(utxo)

        const address = utxo.address
        transaction.from([
          prepareUnspentOutput({
            txId: utxoItem.txHash,
            outputIndex: utxo.index,
            script: scriptFromAddress(address).toString(),
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
          return JSON.stringify(tx)
        }
      } else if ('fromUTXO' in body) {
        privateKeysToSign = await privateKeysFromUTXO(tx, body, options)

        const fromUTXO = body.fromUTXO
        if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
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
  }
}
