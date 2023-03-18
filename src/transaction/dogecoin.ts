import BigNumber from 'bignumber.js'
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import { dogeBroadcast } from '../blockchain'
import { validateBody } from '../connector/tatum'
import { Currency, TransactionKMS, TransferDogeBlockchain } from '../model'

/**
 * Prepare a signed Doge transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
const prepareSignedTransaction = async (body: TransferDogeBlockchain) => {
  await validateBody(body, TransferDogeBlockchain)
  const { fromUTXO, to, fee, changeAddress } = body
  const tx = new Transaction()

  const privateKeysToSign = []
  for (const item of fromUTXO) {
    tx.from({
      txId: item.txHash,
      outputIndex: item.index,
      script: Script.fromAddress(item.address).toString(),
      satoshis: Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
    })
    privateKeysToSign.push(item.signatureId || item.privateKey)
  }
  for (const item of to) {
    tx.to(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
  }

  if (changeAddress && fee) {
    tx.fee(Number(new BigNumber(fee).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
    tx.change(changeAddress)
  }

  if (fromUTXO[0].signatureId) {
    return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
  }
  for (const pk of privateKeysToSign) {
    tx.sign(PrivateKey.fromWIF(pk))
  }
  return tx.serialize({
    disableDustOutputs: true,
  })
}

/**
 * Sign Dogecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signDogecoinKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
  if (tx.chain !== Currency.DOGE) {
    throw Error('Unsupported chain.')
  }
  const builder = new Transaction(JSON.parse(tx.serializedTransaction))
  for (const privateKey of privateKeys) {
    builder.sign(PrivateKey.fromWIF(privateKey))
  }
  return builder.serialize()
}

/**
 * Sign Dogecoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDogecoinSignedTransaction = async (body: TransferDogeBlockchain) => {
  return prepareSignedTransaction(body)
}

/**
 * Send Dogecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDogecoinTransaction = async (body: TransferDogeBlockchain) => {
  return dogeBroadcast(await prepareDogecoinSignedTransaction(body))
}
