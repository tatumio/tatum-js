import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BtcSdkError } from '../btc.sdk.errors'
import { BtcBasedTx, BtcTransactionTypes } from '@tatumio/shared-blockchain-btc-based'

export const btcTransactions = (
  apiCalls: {
    btcGetTxByAddress: typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
    btcGetUtxo: typeof ApiServices.blockchain.bitcoin.btcGetUtxo
    btcBroadcast: typeof ApiServices.blockchain.bitcoin.btcBroadcast
    btcGetRawTransaction: typeof ApiServices.blockchain.bitcoin.btcGetRawTransaction
  } = {
    btcGetTxByAddress: ApiServices.blockchain.bitcoin.btcGetTxByAddress,
    btcGetUtxo: ApiServices.blockchain.bitcoin.btcGetUtxo,
    btcBroadcast: ApiServices.blockchain.bitcoin.btcBroadcast,
    btcGetRawTransaction: ApiServices.blockchain.bitcoin.btcGetRawTransaction,
  },
): BtcBasedTx<BtcTransactionTypes> => {
  const privateKeysFromAddress = async (
    transaction: Transaction,
    body: BtcTransactionFromAddress | BtcTransactionFromAddressKMS,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []
      for (const item of body.fromAddress) {
        const txs = await apiCalls.btcGetTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

        for (const tx of txs) {
          if (!tx.outputs) throw new BtcSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

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
      throw new BtcSdkError(e)
    }
  }

  const privateKeysFromUTXO = async (
    transaction: Transaction,
    body: BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS,
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
      throw new BtcSdkError(e)
    }
  }

  async function getUtxoSilent(hash: string, i: number): Promise<BtcUTXO | null> {
    try {
      return await apiCalls.btcGetUtxo(hash, i)
    } catch (e) {
      return null
    }
  }

  const prepareSignedTransaction = async function (
    body: BtcTransactionTypes,
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
      throw new BtcSdkError(e)
    }
  }

  const sendTransaction = async function (
    body: BtcTransactionTypes,
    options: { testnet: boolean },
  ): Promise<TransactionHashKMS> {
    return apiCalls.btcBroadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  return {
    /**
     * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain
     */
    sendTransaction,
    /**
     * Prepare a signed Btc transaction with the private key locally. Nothing is broadcasted to the blockchain.
     * @returns raw transaction data in hex, to be broadcasted to blockchain.
     */
    prepareSignedTransaction,
  }
}
