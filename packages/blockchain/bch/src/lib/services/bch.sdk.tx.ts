import { ApiServices, BchTx, SignatureId, TransactionHash } from '@tatumio/api-client'
import { bcashAddressHelper } from './../utils/bch.address'
import { BchSdkError } from './../bch.sdk.errors'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
// @ts-ignore
import * as coininfo from 'coininfo'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { BchApiCallsType } from '../../index'
import { BchTransactionTypes, Signature } from '../bch.types'

export const bchTxService = (apiCalls: BchApiCallsType) => {
  const sendTransaction = async (
    body: BchTransactionTypes,
    args: { testnet?: boolean },
  ): Promise<TransactionHash | SignatureId> => {
    const signaturesCount = _.filter(body.fromUTXO, (f) => f.hasOwnProperty('signatureId'))
    if (signaturesCount.length > 0) {
      if (signaturesCount.length !== body.fromUTXO.length) {
        throw new BchSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
      }

      return ApiServices.blockchain.bcash.bchTransferBlockchain(body)
    } else {
      return ApiServices.blockchain.bcash.bchBroadcast({
        txData: await prepareSignedTransaction(body, args),
      })
    }
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
      const amountsToSign: number[] = []
      const outputs: number[] = []
      const signaturesToSign: Signature[] = []

      const txs = await getTransactions(
        apiCalls,
        body.fromUTXO.map((u) => u.txHash),
      )

      for (const [i, item] of body.fromUTXO.entries()) {
        transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
        if ('signatureId' in item) {
          signaturesToSign.push({ id: item.signatureId, index: item.signatureIdIndex })
          privateKeysToSign.push(item.signatureId)
        } else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)

        const vout = txs?.[i]?.vout?.[item.index]
        if (!vout || !vout.value) throw new BchSdkError(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND)

        amountsToSign.push(amountUtils.toSatoshis(vout.value))
      }

      // Validate if all from entries are signatureId or non signatureId
      if (privateKeysToSign.length !== 0 && body.fromUTXO.length !== privateKeysToSign.length) {
        throw new BchSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
      }

      if (signaturesToSign.length !== 0 && body.fromUTXO.length !== signaturesToSign.length) {
        throw new BchSdkError(SdkErrorCode.BTC_BASED_WRONG_BODY)
      }

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({
          txData: JSON.stringify(transactionBuilder.buildIncomplete().toHex()),
          privateKeysToSign,
          signaturesToSign,
          amountsToSign,
        })
      }

      body.to.forEach((item) => {
        const value = amountUtils.toSatoshis(item.value)
        transactionBuilder.addOutput(bcashAddressHelper.getAddress(item.address), value)
        outputs.push(value)
      })

      // send the change to change address
      if (body.changeAddress) {
        const sumOfInputs = _.sum(amountsToSign)
        const sumOfOutputs = _.sum(outputs)
        const defaultFee = 0.00001
        const txFee = amountUtils.toSatoshis(body.fee ?? defaultFee)
        const change = Number(new BigNumber(sumOfInputs).minus(sumOfOutputs).minus(txFee))
        transactionBuilder.addOutput(body.changeAddress, change)
      }

      verifyAmounts(amountsToSign, body)

      for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKeysToSign[i], network)
        transactionBuilder.sign(
          i,
          ecPair,
          undefined,
          0x01,
          amountsToSign[i],
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
      result.push(await apiCalls.bchGetRawTransaction(tx))
    }
    return Promise.all(result)
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}
