import { PendingTransaction } from '@tatumio/api-client'
// @ts-ignore
import * as coininfo from 'coininfo'
import { Currency } from '@tatumio/api-client'
import { bchWallet } from '../bch.sdk.wallet'
// @ts-ignore
import { Transaction, TransactionBuilder, ECPair, ECSignature } from '@tatumio/bitcoincashjs2-lib'
import { BchSdkError } from '../bch.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKmsTransaction = async (tx: PendingTransaction, mnemonic: string, testnet: boolean): Promise<string> => {
  if (tx.chain !== Currency.BCH || !tx.withdrawalResponses) {
    throw new BchSdkError(SdkErrorCode.UNSUPPORTED_CHAIN)
  }
  const [data, amountsToDecode] = tx.serializedTransaction.split(':')
  const transaction = Transaction.fromHex(data)
  const amountsToSign = JSON.parse(amountsToDecode) as number[]
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const builder = TransactionBuilder.fromTransaction(transaction, network)
  for (const [i, response] of tx.withdrawalResponses.entries()) {
    if (response.vIn === '-1') {
      continue
    }
    const wallet = bchWallet()
    const ecPair = new ECPair().fromWIF(
      await wallet.generatePrivateKeyFromMnemonic(mnemonic, response.address?.derivationKey || 0, {
        testnet,
      }),
      network,
    )
    builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, ECSignature.SCHNORR)
  }
  return builder.build().toHex()
}
