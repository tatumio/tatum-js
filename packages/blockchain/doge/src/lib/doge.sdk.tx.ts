// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import { ApiServices, DogeTransactionUTXO, DogeTransactionUTXOKMS, TransactionHash } from '@tatumio/api-client'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { amountUtils } from '@tatumio/shared-abstract-sdk'
import { DogeSdkError } from './doge.sdk.errors'

export type DogeTransactionTypes = DogeTransactionUTXO | DogeTransactionUTXOKMS

export const dogeTransactions = (
  apiCalls: {
    dogeBroadcast: typeof ApiServices.blockchain.doge.dogeBroadcast
  } = {
    dogeBroadcast: ApiServices.blockchain.doge.dogeBroadcast,
  },
): BtcBasedTx<DogeTransactionTypes> => {
  // @TODO add support - by address
  const prepareSignedTransaction = async (body: DogeTransactionTypes): Promise<string> => {
    try {
      const { fromUTXO, to, fee, changeAddress } = body
      const tx = new Transaction()

      const privateKeysToSign = []
      for (const item of fromUTXO) {
        tx.from({
          txId: item.txHash,
          outputIndex: item.index,
          script: Script.fromAddress(item.address).toString(),
          satoshis: amountUtils.toSatoshis(item.value),
        })
        if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
        else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
      }

      for (const item of to) {
        tx.to(item.address, amountUtils.toSatoshis(item.value))
      }
      tx.fee(amountUtils.toSatoshis(fee!)).change(changeAddress)

      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify(tx)
      }

      for (const pk of privateKeysToSign) {
        tx.sign(PrivateKey.fromWIF(pk))
      }

      return tx.serialize()
    } catch (e: any) {
      throw new DogeSdkError(e)
    }
  }

  const sendTransaction = async (body: DogeTransactionTypes): Promise<TransactionHash> => {
    return apiCalls.dogeBroadcast({
      txData: await prepareSignedTransaction(body),
    })
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}
