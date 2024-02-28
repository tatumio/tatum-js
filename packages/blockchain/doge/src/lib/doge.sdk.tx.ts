// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import {
  ApiServices,
  DataApiService,
  DogeTransactionAddress,
  DogeTransactionAddressKMS,
  DogeTransactionUTXO,
  DogeTransactionUTXOKMS,
  TransactionHash,
} from '@tatumio/api-client'
import { BtcBasedFromUtxoReplaceableTypes, BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { DogeSdkError } from './doge.sdk.errors'
import _ from 'lodash'

export type DogeTransactionTypes =
  | DogeTransactionUTXO
  | DogeTransactionUTXOKMS
  | DogeTransactionAddress
  | DogeTransactionAddressKMS

type DogeTxOptions = { testnet: boolean }

export const dogeTransactions = (
  apiCalls: {
    dogeBroadcast: typeof ApiServices.blockchain.doge.dogeBroadcast
    getUTXOsByAddress: typeof DataApiService.getUtxosByAddress
    getUtxo: typeof ApiServices.blockchain.doge.dogeGetUtxo
  } = {
    dogeBroadcast: ApiServices.blockchain.doge.dogeBroadcast,
    getUTXOsByAddress: DataApiService.getUtxosByAddress,
    getUtxo: ApiServices.blockchain.doge.dogeGetUtxo,
  },
): BtcBasedTx<DogeTransactionTypes> => {
  const prepareSignedTransaction = async (
    body: DogeTransactionTypes,
    options: DogeTxOptions,
  ): Promise<string> => {
    try {
      const { to, fee, changeAddress } = body
      validateBody(body)
      const transaction = new Transaction()

      const hasFeeAndChange = !_.isNil(changeAddress) && !_.isNil(fee)
      let totalOutputs = hasFeeAndChange ? amountUtils.toSatoshis(fee) : 0
      let totalInputs = 0

      for (const item of to) {
        const amount = amountUtils.toSatoshis(item.value)
        totalOutputs += amount
        transaction.to(item.address, amount)
      }

      const privateKeysToSign = []
      if ('fromUTXO' in body) {
        for (const item of body.fromUTXO) {
          const satoshis = amountUtils.toSatoshis(item.value)
          totalInputs += satoshis
          transaction.from([
            Transaction.UnspentOutput.fromObject({
              txId: item.txHash,
              outputIndex: item.index,
              script: Script.fromAddress(item.address).toString(),
              satoshis,
            }),
          ])
          if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
          else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
        }
      } else if ('fromAddress' in body) {
        for (const item of body.fromAddress) {
          if (totalInputs >= totalOutputs) {
            break
          }
          const utxos = await apiCalls.getUTXOsByAddress(
            options.testnet ? 'doge-testnet' : 'doge-mainnet',
            item.address,
            amountUtils.fromSatoshis(totalOutputs - totalInputs),
          )
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

      if (hasFeeAndChange) {
        transaction.change(changeAddress)
        transaction.fee(amountUtils.toSatoshis(fee))
      }

      const shouldHaveChangeOutput = totalInputs > totalOutputs && hasFeeAndChange
      checkDustAmountInChange(transaction, body, shouldHaveChangeOutput)

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

  const prepareSignedReplaceableTransaction = async (
    body: BtcBasedFromUtxoReplaceableTypes,
  ): Promise<string> => {
    try {
      const { to, fee, changeAddress } = body
      const transaction = new Transaction()

      const hasFeeAndChange = !_.isNil(changeAddress) && !_.isNil(fee)

      for (const item of to) {
        const amount = amountUtils.toSatoshis(item.value)
        transaction.to(item.address, amount)
      }

      const privateKeysToSign = []
      for (const item of body.fromUTXO) {
        const satoshis = amountUtils.toSatoshis(item.value)
        transaction.from([
          Transaction.UnspentOutput.fromObject({
            txId: item.txHash,
            outputIndex: item.index,
            script: Script.fromAddress(item.address).toString(),
            satoshis,
          }),
        ])
        if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
        else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
      }

      if (hasFeeAndChange) {
        transaction.change(changeAddress)
        transaction.fee(amountUtils.toSatoshis(fee))
      }

      transaction.enableRBF()

      if ('fromUTXO' in body && 'signatureId' in body.fromUTXO[0] && body.fromUTXO[0].signatureId) {
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

  const validateBody = (body: DogeTransactionTypes) => {
    if (!('fromUTXO' in body) && !('fromAddress' in body)) {
      throw new DogeSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
    }

    if (
      ('fromUTXO' in body && _.isEmpty(body.fromUTXO)) ||
      ('fromAddress' in body && _.isEmpty(body.fromAddress))
    ) {
      throw new DogeSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS)
    }

    if ((body.fee && !body.changeAddress) || (!body.fee && body.changeAddress)) {
      throw new DogeSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
    }
  }

  /**
   * In case if change amount is dust, its amount will be appended to fee.
   * We need to check it to prevent implicit amounts change
   */
  const checkDustAmountInChange = (
    transaction: Transaction,
    body: DogeTransactionTypes,
    shouldHaveChangeOutput: boolean,
  ) => {
    const outputsCount = transaction.outputs.length
    const expectedOutputsCount = body.to.length + (shouldHaveChangeOutput ? 1 : 0)
    if (outputsCount !== expectedOutputsCount) {
      throw new DogeSdkError(SdkErrorCode.BTC_BASED_DUST_AMOUNT)
    }
  }

  const sendTransaction = async (
    body: DogeTransactionTypes,
    options: DogeTxOptions,
  ): Promise<TransactionHash> => {
    return apiCalls.dogeBroadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
    prepareSignedReplaceableTransaction,
  }
}
