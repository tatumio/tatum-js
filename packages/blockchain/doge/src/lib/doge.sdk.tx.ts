// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import {
  ApiServices,
  DataApiService,
  DogeTransactionAddress,
  DogeTransactionAddressKMS,
  DogeTransactionUTXO,
  DogeTransactionUTXOKMS,
  DogeUTXO,
  TransactionHash,
} from '@tatumio/api-client'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { amountUtils } from '@tatumio/shared-abstract-sdk'
import { DogeSdkError } from './doge.sdk.errors'

export type DogeTransactionTypes =
  DogeTransactionUTXO
  | DogeTransactionUTXOKMS
  | DogeTransactionAddress
  | DogeTransactionAddressKMS

type DogeTxOptions = { testnet: boolean }

export const dogeTransactions = (
  apiCalls: {
    dogeBroadcast: typeof ApiServices.blockchain.doge.dogeBroadcast
    getUTXOsByAddress: typeof DataApiService.getUtxosByAddress,
    getUtxo: typeof ApiServices.blockchain.doge.dogeGetUtxo,
  } = {
    dogeBroadcast: ApiServices.blockchain.doge.dogeBroadcast,
    getUTXOsByAddress: DataApiService.getUtxosByAddress,
    getUtxo: ApiServices.blockchain.doge.dogeGetUtxo,
  },
): BtcBasedTx<DogeTransactionTypes> => {
  const prepareSignedTransaction = async (body: DogeTransactionTypes, options: DogeTxOptions): Promise<string> => {
    try {
      const { to, fee, changeAddress } = body
      const transaction = new Transaction()

      const privateKeysToSign = []
      let totalOutputs = amountUtils.toSatoshis(fee!)
      for (const item of to) {
        const amount = amountUtils.toSatoshis(item.value)
        totalOutputs += amount
        transaction.to(item.address, amount)
      }
      if ('fromUTXO' in body) {
        for (const item of body.fromUTXO) {
          transaction.from([
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
      } else if ('fromAddress' in body) {
        let totalInputs = 0
        for (const item of body.fromAddress) {
          if (totalInputs >= totalOutputs) {
            break
          }
          const utxos = await apiCalls.getUTXOsByAddress(options.testnet ? 'doge-testnet' : 'doge-mainnet', item.address, amountUtils.fromSatoshis(totalOutputs - totalInputs))
          for (const utxo of utxos) {
            const satoshis = amountUtils.toSatoshis(utxo.value)
            totalInputs += satoshis
            transaction.from([
              Transaction.UnspentOutput.fromObject({
                txId: utxo.txHash,
                outputIndex: utxo.index,
                script: Script.fromAddress(utxo.address).toString(),
                satoshis,
              }),
            ])

            if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
            else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
          }
        }
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

  const sendTransaction = async (body: DogeTransactionTypes, options: DogeTxOptions): Promise<TransactionHash> => {
    return apiCalls.dogeBroadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}
