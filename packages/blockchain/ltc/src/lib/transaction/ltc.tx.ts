import BigNumber from 'bignumber.js'
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
  const tx = new Transaction()
  let privateKeysToSign: string[] = []

  body.to.forEach((to) => {
    tx.to(
      to.address,
      Number(new BigNumber(to.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
    )
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

  privateKeysToSign.forEach((key) => {
    tx.sign(PrivateKey.fromWIF(key))
  })

  return tx.serialize()
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
          await ApiServices.blockchain.ltc.ltcGetUtxo(tx.hash!, i)

          transaction.from({
            txId: tx.hash,
            outputIndex: i,
            script: Script.fromAddress(item.address).toString(),
            satoshis: Number(
              new BigNumber(o.value!).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR),
            ),
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
    const address = tx.outputs![item.index].address
    const value = tx.outputs![item.index].value

    transaction.from({
      txId: item.txHash,
      outputIndex: item.index,
      script: Script.fromAddress(address).toString(),
      satoshis: Number(new BigNumber(value!).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
    })

    if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
    else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
  }

  return privateKeysToSign
}

export const ltcTransactions = () => ({
  sendTransaction,
  prepareSignedTransaction,
})
