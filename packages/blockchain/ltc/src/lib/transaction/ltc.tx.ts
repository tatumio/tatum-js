// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-ltc'
import {
  ApiServices,
  LtcTransactionAddress,
  LtcTransactionAddressKMS,
  LtcTransactionUTXO,
  LtcTransactionUTXOKMS,
  TransactionHashKMS,
} from '@tatumio/api-client'
import { amountUtils, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import BigNumber from 'bignumber.js'
import { LtcSdkError } from '../ltc.sdk.errors'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'

type LtcTransaction =
  | LtcTransactionAddress
  | LtcTransactionAddressKMS
  | LtcTransactionUTXO
  | LtcTransactionUTXOKMS

const sendTransaction = async (body: LtcTransaction): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.ltc.ltcBroadcast({
    txData: await prepareSignedTransaction(body),
  })
}

const prepareSignedTransaction = async (body: LtcTransaction): Promise<string> => {
  try {
    const tx = new Transaction()
    let privateKeysToSign: string[] = []

    body.to.forEach((to) => {
      tx.to(to.address, amountUtils.toSatoshis(to.value))
    })

    if ('fromAddress' in body) {
      privateKeysToSign = await privateKeysFromAddress(tx, body)

      const fromAddress = body.fromAddress
      if (fromAddress && 'signatureId' in fromAddress[0] && fromAddress[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
      }
    } else if ('fromUTXO' in body) {
      privateKeysToSign = await privateKeysFromUTXO(tx, body)

      const fromUTXO = body.fromUTXO
      if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
        return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
      }
    }

    verifyAmounts(tx, body)

    privateKeysToSign.forEach((key) => {
      tx.sign(PrivateKey.fromWIF(key))
    })

    // @TODO unchecked serialize
    return tx.serialize(true)
  } catch (e: any) {
    throw new LtcSdkError(e)
  }
}

function verifyAmounts(tx: Transaction, body: LtcTransaction) {
  const outputsSum: BigNumber = body.to
    .map((to) => amountUtils.toSatoshis(to.value))
    .reduce((e, acc) => e.plus(acc), new BigNumber(0))

  const inputsSum: BigNumber = tx.inputs
    .map((i: any) => new BigNumber(i.output.satoshis))
    .reduce((v: BigNumber, acc: BigNumber) => v.plus(acc), new BigNumber(0))

  if (outputsSum.eq(inputsSum)) {
    throw new LtcSdkError(SdkErrorCode.BTC_FEE_TOO_SMALL)
  }

  if (outputsSum.gt(inputsSum)) {
    throw new LtcSdkError(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
  }
}

const privateKeysFromAddress = async (
  transaction: Transaction,
  body: LtcTransactionAddress | LtcTransactionAddressKMS,
): Promise<Array<string>> => {
  const privateKeysToSign = []
  for (const item of body.fromAddress) {
    const txs = await ApiServices.blockchain.ltc.ltcGetTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

    for (const tx of txs) {
      for (const [i, o] of tx.outputs!.entries()) {
        if (o.address !== item.address) {
          continue
        }

        try {
          transaction.from({
            txId: tx.hash,
            outputIndex: i,
            script: Script.fromAddress(item.address).toString(),
            satoshis: amountUtils.toSatoshis(o.value!), // @TODO null check
          })

          if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
          else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
        } catch (e: any) {
          console.error(e.toString())
        }
      }
    }
  }
  return privateKeysToSign
}

const privateKeysFromUTXO = async (
  transaction: Transaction,
  body: LtcTransactionUTXO | LtcTransactionUTXOKMS,
): Promise<Array<string>> => {
  const privateKeysToSign = []

  for (const item of body.fromUTXO) {
    const tx = await ApiServices.blockchain.ltc.ltcGetRawTransaction(item.txHash)

    const output = (tx.outputs ?? [])[item.index]
    if (!output || !output.address || !output.value) throw new LtcSdkError(SdkErrorCode.BTC_UTXO_NOT_FOUND)

    transaction.from({
      txId: item.txHash,
      outputIndex: item.index,
      script: Script.fromAddress(output.address).toString(),
      satoshis: amountUtils.toSatoshis(output.value),
    })

    if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
    else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
  }

  return privateKeysToSign
}

export const ltcTransactions = (): BtcBasedTx<LtcTransaction> => ({
  sendTransaction,
  prepareSignedTransaction,
})
