import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
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

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: { testnet: boolean }) => Promise<TransactionHashKMS>
  prepareSignedTransaction: (body: T, options: { testnet: boolean }) => Promise<string>
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

type GetRawTransactionType =
  | typeof ApiServices.blockchain.bitcoin.btcGetRawTransaction
  | typeof ApiServices.blockchain.ltc.ltcGetRawTransaction

//TODO prepare to use between btc based
export const btcBasedTransactions = (apiCalls: {
  getTxByAddress: GetTxByAddressType
  getUtxo: GetUtxoType
  broadcast: BroadcastType
  getRawTransaction: GetRawTransactionType
}): BtcBasedTx<BtcBasedTransactionTypes> => {
  const privateKeysFromAddress = async (
    transaction: Transaction,
    body: BtcFromAddressTypes | LtcFromAddressTypes,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []
      for (const item of body.fromAddress) {
        const txs = await apiCalls.getTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

        for (const tx of txs) {
          if (!tx.outputs) throw new BtcBasedSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

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
          continue
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
    body: BtcTransactionTypes | LtcTransactionTypes,
    options: { testnet: boolean },
  ): Promise<string> {
    try {
      const tx = new Transaction()
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

      return tx.serialize()
    } catch (e: any) {
      throw new BtcBasedSdkError(e)
    }
  }

  const sendTransaction = async function (
    body: BtcTransactionTypes,
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
