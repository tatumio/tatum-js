import { PendingTransaction } from '@tatumio/api-client'
// @ts-ignore
import * as coininfo from 'coininfo'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import { Currency } from '@tatumio/api-client'
import { bchWallet } from '../bch.sdk.wallet'

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKmsTransaction = async (tx: PendingTransaction, mnemonic: string, testnet: boolean) => {
  if (tx.chain !== Currency.BCH || !tx.withdrawalResponses) {
    throw Error('Unsupported chain.')
  }
  const [data, amountsToDecode] = tx.serializedTransaction.split(':')
  const transaction = BitcoinCashJS.Transaction.fromHex(data)
  const amountsToSign = JSON.parse(amountsToDecode) as number[]
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const builder = BitcoinCashJS.TransactionBuilder.fromTransaction(transaction, network)
  for (const [i, response] of tx.withdrawalResponses.entries()) {
    if (response.vIn === '-1') {
      continue
    }
    const wallet = bchWallet()
    const ecPair = BitcoinCashJS.ECPair.fromWIF(
      await wallet.generatePrivateKeyFromMnemonic(mnemonic, response.address?.derivationKey || 0, {
        testnet,
      }),
      network,
    )
    builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, BitcoinCashJS.ECSignature.SCHNORR)
  }
  return builder.build().toHex()
}
