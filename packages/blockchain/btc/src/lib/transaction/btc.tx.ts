import BigNumber from 'bignumber.js'
import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  TransactionHashKMS,
} from '@tatumio/api-client'

type BtcTransaction =
  | BtcTransactionFromAddress
  | BtcTransactionFromAddressKMS
  | BtcTransactionFromUTXO
  | BtcTransactionFromUTXOKMS

const sendTransaction = async (body: BtcTransaction): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.bitcoin.btcBroadcast({
    txData: await prepareSignedTransaction(body),
  })
}

const prepareSignedTransaction = async (body: BtcTransaction): Promise<string> => {
  const tx = new Transaction()
  let privateKeysToSign = []

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
    tx.sign(new PrivateKey(key))
  })

  return tx.serialize()
}

const privateKeysFromAddress = async (
  transaction: Transaction,
  body: BtcTransactionFromAddress | BtcTransactionFromAddressKMS,
): Promise<Array<string>> => {
  const privateKeysToSign = []
  for (const item of body.fromAddress) {
    const txs = await ApiServices.blockchain.bitcoin.btcGetTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

    for (const tx of txs) {
      for (const [i, o] of tx.outputs.entries()) {
        if (o.address !== item.address) {
          continue
        }

        try {
          await ApiServices.blockchain.bitcoin.btcGetUtxo(tx.hash, i)

          transaction.from([
            Transaction.UnspentOutput.fromObject({
              txId: tx.hash,
              outputIndex: i,
              script: Script.fromAddress(item.address).toString(),
              satoshis: o.value,
            }),
          ])

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
  body: BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS,
): Promise<Array<string>> => {
  const privateKeysToSign = []

  for (const item of body.fromUTXO) {
    const tx = await ApiServices.blockchain.bitcoin.btcGetRawTransaction(item.txHash)
    const address = tx.outputs[item.index].address
    const value = tx.outputs[item.index].value

    transaction.from([
      Transaction.UnspentOutput.fromObject({
        txId: item.txHash,
        outputIndex: item.index,
        script: Script.fromAddress(address).toString(),
        satoshis: value,
      }),
    ])

    if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
    else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
  }

  return privateKeysToSign
}

export const btcTransactions = () => ({
  /**
   * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  sendTransaction,
  /**
   * Prepare a signed Btc transaction with the private key locally. Nothing is broadcasted to the blockchain.
   * @returns raw transaction data in hex, to be broadcasted to blockchain.
   */
  prepareSignedTransaction,
})
