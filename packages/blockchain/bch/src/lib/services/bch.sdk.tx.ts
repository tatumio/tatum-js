import { ApiServices, BchTx, TransactionHash } from '@tatumio/api-client'
import { bcashAddressHelper } from '../utils/bch.address'
import { BchSdkError } from '../bch.sdk.errors'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
// @ts-ignore
import * as coininfo from 'coininfo'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { BchApiCallsType } from '../..'
// @ts-ignore
import * as bitcoreLibCash from 'bitcore-lib-cash'
import { BchTransactionTypes, Signature } from '../bch.sdk.types'

export const bchTransactions = (apiCalls: BchApiCallsType) => {
  const sendTransaction = async (
    body: BchTransactionTypes,
    args: { testnet?: boolean },
  ): Promise<TransactionHash> => {
    return ApiServices.blockchain.bcash.bchBroadcast({
      txData: await prepareSignedTransaction(body, args),
    })
  }

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
      const signaturesToSign: Signature[] = []
      const amountToSign: number[] = []
      const outputs: number[] = []

      const txs = await getTransactions(
        apiCalls,
        body.fromUTXO.map((u) => u.txHash),
      )

      for (const [i, item] of body.fromUTXO.entries()) {
        transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
        if ('signatureId' in item) {
          privateKeysToSign.push(item.signatureId)
          signaturesToSign.push({ id: item.signatureId, index: item.signatureIdIndex })
        } else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)

        const vout = txs?.[i]?.vout?.[item.index]
        if (!vout || !vout.value) throw new BchSdkError(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND)

        amountToSign.push(amountUtils.toSatoshis(vout.value))
      }

      for (const item of body.to) {
        const value = amountUtils.toSatoshis(item.value)
        try {
          const address = bcashAddressHelper.getAddress(item.address)
          transactionBuilder.addOutput(address, value)
          outputs.push(value)
        } catch (e: any) {
          const address = new bitcoreLibCash.Address.fromString(item.address)
          transactionBuilder.addOutput(address.toLegacyAddress(), value)
          outputs.push(value)
        }
      }

      // send the change to change address
      if (body.changeAddress) {
        const sumOfInputs = _.sum(amountToSign)
        const sumOfOutputs = _.sum(outputs)
        const defaultFee = 0.00001
        const txFee = amountUtils.toSatoshis(body.fee ?? defaultFee)
        const change = Number(new BigNumber(sumOfInputs).minus(sumOfOutputs).minus(txFee))
        try {
          transactionBuilder.addOutput(bcashAddressHelper.getAddress(body.changeAddress), change)
        } catch (e: any) {
          const address = new bitcoreLibCash.Address.fromString(body.changeAddress)
          transactionBuilder.addOutput(address.toLegacyAddress(), change)
        }
      }

      verifyAmounts(amountToSign, body)

      // Validate if all from entries are signatureId or non signatureId
      if (privateKeysToSign.length !== 0 && body.fromUTXO.length !== privateKeysToSign.length) {
        throw new BchSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
      }

      if (signaturesToSign.length !== 0 && body.fromUTXO.length !== signaturesToSign.length) {
        throw new BchSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
      }

      if ('signatureId' in body.fromUTXO[0]) {
        return `${transactionBuilder.buildIncomplete().toHex()}:${JSON.stringify(amountToSign)}`
      }

      for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKeysToSign[i], network)
        transactionBuilder.sign(
          i,
          ecPair,
          undefined,
          BitcoinCashJS.Transaction.SIGHASH_ALL,
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

  const getTransactions = async (apiCalls: BchApiCallsType, txHash: string[]): Promise<BchTx[]> => {
    const result = []
    for (const tx of txHash) {
      result.push(apiCalls.bchGetRawTransaction(tx))
    }
    return Promise.all(result)
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}
