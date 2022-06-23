import {
  ApiServices,
  BchTransaction,
  BchTransactionKMS,
  BchTx,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { bcashAddressHelper } from './utils/bch.address'
import { BchSdkError } from './bch.sdk.errors'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

import coininfo from 'coininfo'
import { ECPair, ECSignature, TransactionBuilder } from '@tatumio/bitcoincashjs2-lib'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import BigNumber from 'bignumber.js'

export type BchTransactionTypes = BchTransaction | BchTransactionKMS

const sendTransaction = async (
  body: BchTransactionTypes,
  args: { testnet?: boolean },
): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.bcash.bchBroadcast({
    txData: await prepareSignedTransaction(body, args),
  })
}

// @TODO add support - by address
const prepareSignedTransaction = async (
  body: BchTransactionTypes,
  args: { testnet?: boolean },
): Promise<string> => {
  try {
    const network = args.testnet
      ? coininfo.bitcoincash.test.toBitcoinJS()
      : coininfo.bitcoincash.main.toBitcoinJS()

    const transactionBuilder = new TransactionBuilder(network)
    const privateKeysToSign = []
    const amountToSign: number[] = []
    const txs = await getTransactions(body.fromUTXO.map((u) => u.txHash))

    for (const [i, item] of body.fromUTXO.entries()) {
      transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
      if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
      else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)

      const vout = txs[i].vout[item.index]
      if (!vout) throw new BchSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

      amountToSign.push(amountUtils.toSatoshis(vout.value))

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(txs[i]), privateKeysToSign })
      }
    }

    body.to.forEach((item) => {
      transactionBuilder.addOutput(
        bcashAddressHelper.getAddress(item.address),
        amountUtils.toSatoshis(item.value),
      )
    })

    verifyAmounts(amountToSign, body)

    for (let i = 0; i < privateKeysToSign.length; i++) {
      const ecPair = ECPair.fromWIF(privateKeysToSign[i], network)
      transactionBuilder.sign(i, ecPair, undefined, 0x01, amountToSign[i], undefined, ECSignature.SCHNORR)
    }

    return transactionBuilder.build().toHex()
  } catch (e) {
    throw new BchSdkError(e)
  }
}

function verifyAmounts(amountToSign: number[], body: BchTransactionTypes) {
  const outputsSum = body.to
    .map((to) => amountUtils.toSatoshis(to.value))
    .reduce((e, acc) => e.plus(acc), new BigNumber(0))

  const inputsSum = amountToSign
    .map((i) => new BigNumber(i))
    .reduce((v, acc) => v.plus(acc), new BigNumber(0))

  if (outputsSum.eq(inputsSum)) {
    throw new BchSdkError(SdkErrorCode.BTC_FEE_TOO_SMALL)
  }

  if (outputsSum.gt(inputsSum)) {
    throw new BchSdkError(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
  }
}

const getTransactions = async (txHash: string[]): Promise<BchTx[]> => {
  const result = []
  for (const tx of txHash) {
    result.push(ApiServices.blockchain.bcash.bchGetRawTransaction(tx))
  }
  return Promise.all(result)
}

export const bchTransactions = (): BtcBasedTx<BchTransactionTypes> => ({
  sendTransaction,
  prepareSignedTransaction,
})
