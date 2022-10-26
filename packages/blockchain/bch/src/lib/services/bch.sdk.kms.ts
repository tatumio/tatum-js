import { PendingTransaction } from '@tatumio/api-client'
// @ts-ignore
import * as coininfo from 'coininfo'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import { Currency } from '@tatumio/api-client'

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBitcoinCashKMSTransaction = async (
  tx: PendingTransaction,
  privateKeys: string[],
  testnet: boolean,
) => {
  if (tx.chain !== Currency.BCH) {
    throw Error('Unsupported chain.')
  }
  const [data, amountsToDecode] = tx.serializedTransaction.split(':')
  const transaction = BitcoinCashJS.Transaction.fromHex(data)
  const amountsToSign = JSON.parse(amountsToDecode)
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const builder = BitcoinCashJS.TransactionBuilder.fromTransaction(transaction, network)
  for (const [i, privateKey] of privateKeys.entries()) {
    const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKey, network)
    builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, BitcoinCashJS.ECSignature.SCHNORR)
  }
  return builder.build().toHex()
}