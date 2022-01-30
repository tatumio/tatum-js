import BigNumber from 'bignumber.js'
import {
  ApiServices,
  BchTransaction,
  BchTransactionKMS,
  BchTx,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { bcashAddressHelper } from '../utils/bch.address'
import { BchSdkError } from '../bch.sdk.errors'
import { SdkErrorCode } from '@tatumio/abstract-sdk'

import coininfo from 'coininfo'
import { ECPair, ECSignature, TransactionBuilder } from '@tatumio/bitcoincashjs2-lib'

type BchTransactionBody = BchTransaction | BchTransactionKMS

const sendTransaction = async (
  body: BchTransactionBody,
  args: { testnet?: boolean },
): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.bcash.bchBroadcast({
    txData: await prepareSignedTransaction(body, args),
  })
}

const prepareSignedTransaction = async (
  body: BchTransactionBody,
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

      amountToSign.push(
        Number(new BigNumber(vout.value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)),
      )

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(txs[i]), privateKeysToSign })
      }
    }

    body.to.forEach((item) => {
      transactionBuilder.addOutput(
        bcashAddressHelper.getAddress(item.address),
        Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)),
      )
    })

    for (let i = 0; i < privateKeysToSign.length; i++) {
      const ecPair = ECPair.fromWIF(privateKeysToSign[i], network)
      transactionBuilder.sign(i, ecPair, undefined, 0x01, amountToSign[i], undefined, ECSignature.SCHNORR)
    }

    return transactionBuilder.build().toHex()
  } catch (e) {
    throw new BchSdkError(e)
  }
}

const getTransactions = async (txHash: string[]): Promise<BchTx[]> => {
  const result = []
  for (const tx of txHash) {
    result.push(ApiServices.blockchain.bcash.bchGetRawTransaction(tx))
  }
  return await Promise.all(result)
}

export const bchTransactions = () => ({
  sendTransaction,
  prepareSignedTransaction,
})
