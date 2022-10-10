import { ApiServices, BchTransaction, BchTransactionKMS, BchTx, TransactionHash } from '@tatumio/api-client'
import { bcashAddressHelper } from './utils/bch.address'
import { BchSdkError } from './bch.sdk.errors'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
// @ts-ignore
import * as coininfo from 'coininfo'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import BigNumber from 'bignumber.js'
import _ from 'lodash'

export type BchTransactionTypes = BchTransaction | BchTransactionKMS

const sendTransaction = async (
  body: BchTransactionTypes,
  args: { testnet?: boolean },
): Promise<TransactionHash> => {
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

    const transactionBuilder = new BitcoinCashJS.TransactionBuilder(network)
    const privateKeysToSign = []
    const amountToSign: number[] = []
    const outputs: number[] = []

    const txs = await getTransactions(body.fromUTXO.map((u) => u.txHash))

    for (const [i, item] of body.fromUTXO.entries()) {
      transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
      if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
      else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)

      const vout = txs?.[i]?.vout?.[item.index]
      if (!vout || !vout.value) throw new BchSdkError(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND)

      amountToSign.push(amountUtils.toSatoshis(vout.value))

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(txs[i]), privateKeysToSign })
      }
    }

    body.to.forEach((item) => {
      const value = amountUtils.toSatoshis(item.value)
      transactionBuilder.addOutput(bcashAddressHelper.getAddress(item.address), value)
      outputs.push(value)
    })

    // send the change to change address
    if (body.changeAddress) {
      const sumOfInputs = _.sum(amountToSign)
      const sumOfOutputs = _.sum(outputs)
      const defaultFee = 0.00001
      const txFee = amountUtils.toSatoshis(body.fee ?? defaultFee)
      const change = Number(new BigNumber(sumOfInputs).minus(sumOfOutputs).minus(txFee))
      transactionBuilder.addOutput(body.changeAddress, change)
    }

    verifyAmounts(amountToSign, body)

    for (let i = 0; i < privateKeysToSign.length; i++) {
      const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKeysToSign[i], network)
      transactionBuilder.sign(
        i,
        ecPair,
        undefined,
        0x01,
        amountToSign[i],
        undefined,
        BitcoinCashJS.ECSignature.SCHNORR,
      )
    }

    return transactionBuilder.build().toHex()
  } catch (e: any) {
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
    throw new BchSdkError(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
  }

  if (outputsSum.gt(inputsSum)) {
    throw new BchSdkError(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
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
