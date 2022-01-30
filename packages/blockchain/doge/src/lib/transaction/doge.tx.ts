import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import {
  ApiServices,
  DogeTransactionUTXO,
  DogeTransactionUTXOKMS,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { amountUtils } from '@tatumio/abstract-sdk'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'

export type DogeTransaction = DogeTransactionUTXO | DogeTransactionUTXOKMS

const prepareSignedTransaction = async (body: DogeTransaction): Promise<string> => {
  try {
    const tx = new Transaction().fee(amountUtils.toSatoshis(body.fee)).change(body.changeAddress)
    const privateKeysToSign = []

    for (const item of body.fromUTXO) {
      tx.from([
        Transaction.UnspentOutput.fromObject({
          txId: item.txHash,
          outputIndex: item.index,
          script: Script.fromAddress(item.address).toString(),
          satoshis: amountUtils.toSatoshis(item.value),
        }),
      ])
      if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
      else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
    }

    const fromUTXO = body.fromUTXO
    if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
      return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
    }

    body.to.forEach((to) => {
      tx.to(to.address, amountUtils.toSatoshis(to.value))
    })

    privateKeysToSign.forEach((key) => {
      tx.sign(PrivateKey.fromWIF(key))
    })

    return tx.serialize()
  } catch (e) {
    console.log('TRANSACTION ERROR: ', e)
  }
}

const sendTransaction = async (body: DogeTransaction): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.doge.dogeBroadcast({
    txData: await prepareSignedTransaction(body),
  })
}

export const dogeTransactions = (): BtcBasedTx<DogeTransaction> => ({
  sendTransaction,
  prepareSignedTransaction,
})
