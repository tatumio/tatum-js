// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import {
  ApiServices,
  DogeTransactionUTXO,
  DogeTransactionUTXOKMS,
  DogeUTXO,
  TransactionHash,
} from '@tatumio/api-client'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { amountUtils } from '@tatumio/shared-abstract-sdk'
import { DogeSdkError } from './doge.sdk.errors'

interface DogeTransactionBase {
  to: Array<{
    address: string;
    value: number;
  }>;
  fee?: string;
  changeAddress?: string;
}

export interface DogeTransactionAddress extends DogeTransactionBase {
  fromAddress: {
    address: string,
    privateKey: string,
  }[]
}

interface DogeTransactionAddressKMS extends DogeTransactionBase {
  fromAddress: {
    address: string,
    signatureId: string,
    index?: number,
  }[]
}

export type DogeTransactionTypes =
  DogeTransactionUTXO
  | DogeTransactionUTXOKMS
  | DogeTransactionAddress
  | DogeTransactionAddressKMS

export const dogeTransactions = (
  apiCalls: {
    dogeBroadcast: typeof ApiServices.blockchain.doge.dogeBroadcast
    getTxByAddress: typeof ApiServices.blockchain.doge.dogeGetTxByAddress,
    getUtxo: typeof ApiServices.blockchain.doge.dogeGetUtxo,
  } = {
    dogeBroadcast: ApiServices.blockchain.doge.dogeBroadcast,
    getTxByAddress: ApiServices.blockchain.doge.dogeGetTxByAddress,
    getUtxo: ApiServices.blockchain.doge.dogeGetUtxo,
  },
): BtcBasedTx<DogeTransactionTypes> => {
  // @TODO add support - by address
  const prepareSignedTransaction = async (body: DogeTransactionTypes): Promise<string> => {
    try {
      const { to, fee, changeAddress } = body
      const transaction = new Transaction()

      const privateKeysToSign = []

      if ('fromUTXO' in body) {
        for (const item of body.fromUTXO) {
          transaction.from({
            txId: item.txHash,
            outputIndex: item.index,
            script: Script.fromAddress(item.address).toString(),
            satoshis: amountUtils.toSatoshis(item.value),
          })
          if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
          else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
        }
      } else if ('fromAddress' in body) {
        for (const item of body.fromAddress) {
          const utxos: DogeUTXO[] = []
          const txs = await apiCalls.getTxByAddress(item.address, 50, 0, 'incoming')

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
                Transaction.UnspentOutput.fromObject({
                  txId: tx.hash,
                  outputIndex: i,
                  script: Script.fromAddress(o.address).toString(),
                  satoshis: amountUtils.toSatoshis(utxo.value),
                }),
              ])

              if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
              else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
            }
          }
        }
      }

      for (const item of to) {
        transaction.to(item.address, amountUtils.toSatoshis(item.value))
      }
      transaction.fee(amountUtils.toSatoshis(fee!)).change(changeAddress)

      if ('fromUTXO' in body && 'signatureId' in body.fromUTXO[0] && body.fromUTXO[0].signatureId) {
        return JSON.stringify(transaction)
      }
      if ('fromAddress' in body && 'signatureId' in body.fromAddress[0] && body.fromAddress[0].signatureId) {
        return JSON.stringify(transaction)
      }

      for (const pk of privateKeysToSign) {
        transaction.sign(PrivateKey.fromWIF(pk))
      }

      return transaction.serialize()
    } catch (e: any) {
      throw new DogeSdkError(e)
    }
  }

  async function getUtxoSilent(hash: string, i: number): Promise<DogeUTXO | null> {
    try {
      return await apiCalls.getUtxo(hash, i)
    } catch (e) {
      return null
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
