import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BtcSdkError } from '../btc.sdk.errors'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'

type BtcTransaction =
  | BtcTransactionFromAddress
  | BtcTransactionFromAddressKMS
  | BtcTransactionFromUTXO
  | BtcTransactionFromUTXOKMS

const sendTransaction = async (body: BtcTransaction): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.bitcoin.btcBroadcast({
    txData: await prepareSignedTransaction(body),
  })
}

const prepareSignedTransaction = async (body: BtcTransaction): Promise<string> => {
  try {
    const tx = new Transaction()
    let privateKeysToSign: string[] = []

    body.to.forEach((to) => {
      tx.to(to.address, amountUtils.toSatoshis(to.value))
    })

    if ('fromAddress' in body) {
      privateKeysToSign = await privateKeysFromAddress(tx, body)

      const fromAddress = body.fromAddress
      if (fromAddress && 'signatureId' in fromAddress[0] && fromAddress[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
      }
    } else if ('fromUTXO' in body) {
      privateKeysToSign = await privateKeysFromUTXO(tx, body)

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
      }
    }

    privateKeysToSign.forEach((key) => {
      tx.sign(new PrivateKey(key))
    })

    return tx.serialize()
  } catch (e: any) {
    throw new BtcSdkError(e)
  }
}

const privateKeysFromAddress = async (
  transaction: Transaction,
  body: BtcTransactionFromAddress | BtcTransactionFromAddressKMS,
): Promise<Array<string>> => {
  try {
    const privateKeysToSign = []
    for (const item of body.fromAddress) {
      const txs = await ApiServices.blockchain.bitcoin.btcGetTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

      for (const tx of txs) {
        if (!tx.outputs) throw new BtcSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

        for (const [i, o] of tx.outputs.entries()) {
          if (o.address !== item.address) {
            continue
          }

          transaction.from([
            Transaction.UnspentOutput.fromObject({
              txId: tx.hash,
              outputIndex: i,
              script: Script.fromAddress(item.address).toString(),
              satoshis: o.value,
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

    for (const item of body.fromUTXO) {
      const tx = await ApiServices.blockchain.bitcoin.btcGetRawTransaction(item.txHash)

      const output = (tx.outputs ?? [])[item.index]
      if (!output || !output.address || !output.value) throw new BtcSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

      const script = Script.fromAddress(output.address).toString()
      transaction.from([
        Transaction.UnspentOutput.fromObject({
          txId: item.txHash,
          outputIndex: item.index,
          script: script,
          satoshis: output.value,
        }),
      ])

      if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
      else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
    }

    return privateKeysToSign
  } catch (e: any) {
    throw new BtcSdkError(e)
  }
}

export const btcTransactions = (): BtcBasedTx<BtcTransaction> => ({
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
})
