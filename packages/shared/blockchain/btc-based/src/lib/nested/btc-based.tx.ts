import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
  Currency,
  LtcTransactionAddress,
  LtcTransactionAddressKMS,
  LtcTransactionUTXO,
  LtcTransactionUTXOKMS,
  LtcUTXO,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BtcBasedSdkError } from '../btc-based.sdk.errors'
import BigNumber from 'bignumber.js'

interface BtcBasedTransaction extends Transaction {
  serialize(unchecked?: boolean): string
}

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: { testnet: boolean }) => Promise<TransactionHashKMS>
  prepareSignedTransaction: (body: T, options: { testnet: boolean }) => Promise<string>
}

export type BtcTransactionTypes =
  | (BtcTransactionFromAddress & FeeChange)
  | (BtcTransactionFromAddressKMS & FeeChange)
  | (BtcTransactionFromUTXO & FeeChange)
  | (BtcTransactionFromUTXOKMS & FeeChange)

export type FeeChange = { fee?: number; change?: string }

export type LtcTransactionTypes =
  | (LtcTransactionAddress & FeeChange)
  | (LtcTransactionAddressKMS & FeeChange)
  | (LtcTransactionUTXO & FeeChange)
  | (LtcTransactionUTXOKMS & FeeChange)

type BtcBasedTransactionTypes = BtcTransactionTypes | LtcTransactionTypes

type BtcFromAddressTypes = BtcTransactionFromAddress | BtcTransactionFromAddressKMS

type LtcFromAddressTypes = LtcTransactionAddress | LtcTransactionAddressKMS

type BtcFromUtxoTypes = BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS
type LtcFromUtxoTypes = LtcTransactionUTXO | LtcTransactionUTXOKMS

type GetTxByAddressType =
  | typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
  | typeof ApiServices.blockchain.ltc.ltcGetTxByAddress

type GetUtxoType =
  | typeof ApiServices.blockchain.bitcoin.btcGetUtxo
  | typeof ApiServices.blockchain.ltc.ltcGetUtxo

type BroadcastType =
  | typeof ApiServices.blockchain.bitcoin.btcBroadcast
  | typeof ApiServices.blockchain.ltc.ltcBroadcast

export const btcBasedTransactions = (
  currency: Currency,
  apiCalls: {
    getTxByAddress: GetTxByAddressType
    getUtxo: GetUtxoType
    broadcast: BroadcastType
  },
): BtcBasedTx<BtcBasedTransactionTypes> => {
  const privateKeysFromAddress = async (
    transaction: Transaction,
    body: BtcFromAddressTypes | LtcFromAddressTypes,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []
      for (const item of body.fromAddress) {
        const txs = await apiCalls.getTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

        for (const tx of txs) {
          if (!tx.outputs)
            throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND, [tx.hash ?? '', 0])

          if (tx.hash === undefined) continue

          for (const [i, o] of tx.outputs.entries()) {
            if (o.address !== item.address) {
              continue
            }

            const utxo = await getUtxoSilent(tx.hash, i)
            if (utxo === null) {
              continue
            }

            transaction.from([
              Transaction.UnspentOutput.fromObject({
                txId: tx.hash,
                outputIndex: i,
                script: Script.fromAddress(o.address).toString(),
                satoshis: utxo.value,
              }),
            ])

            if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
            else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
          }
        }
      }
      return privateKeysToSign
    } catch (e: any) {
      throw new BtcBasedSdkError(e)
    }
  }

  const privateKeysFromUTXO = async (
    transaction: Transaction,
    body: BtcFromUtxoTypes | LtcFromUtxoTypes,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []

      for (const utxoItem of body.fromUTXO) {
        const utxo = await getUtxoSilent(utxoItem.txHash, utxoItem.index)
        if (utxo === null || utxo.address === undefined) {
          throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND, [utxoItem.txHash, utxoItem.index])
        }

        const script = Script.fromAddress(utxo.address).toString()
        transaction.from([
          Transaction.UnspentOutput.fromObject({
            txId: utxoItem.txHash,
            outputIndex: utxo.index,
            script: script,
            satoshis: utxo.value,
          }),
        ])

        if ('signatureId' in utxoItem) privateKeysToSign.push(utxoItem.signatureId)
        else if ('privateKey' in utxoItem) privateKeysToSign.push(utxoItem.privateKey)
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof BtcBasedSdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
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
    options: { testnet: boolean },
  ): Promise<string> {
    try {
      const tx: BtcBasedTransaction = new Transaction()
      let privateKeysToSign: string[] = []

      if (body.change) {
        tx.change(body.change)
      }
      if (body.fee) {
        tx.fee(amountUtils.toSatoshis(body.fee))
      }
      body.to.forEach((to) => {
        tx.to(to.address, amountUtils.toSatoshis(to.value))
      })

      if ('fromAddress' in body) {
        privateKeysToSign = await privateKeysFromAddress(tx, body)

        const fromAddress = body.fromAddress
        if (fromAddress && 'signatureId' in fromAddress[0] && fromAddress[0].signatureId) {
          return JSON.stringify(tx)
        }
      } else if ('fromUTXO' in body) {
        privateKeysToSign = await privateKeysFromUTXO(tx, body)

        const fromUTXO = body.fromUTXO
        if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
          return JSON.stringify(tx)
        }
      }

      new Set(privateKeysToSign).forEach((key) => {
        tx.sign(new PrivateKey(key))
      })

      const uncheckedSerialization = currency === Currency.LTC //TODO some troubles in signing LTC?
      if (uncheckedSerialization) {
        verifyAmounts(tx, body)
      }
      return tx.serialize(uncheckedSerialization)
    } catch (e: any) {
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
    options: { testnet: boolean },
  ): Promise<TransactionHashKMS> {
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
