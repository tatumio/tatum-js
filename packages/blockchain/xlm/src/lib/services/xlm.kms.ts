import { Blockchain } from '@tatumio/shared-core'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { Keypair, Networks, TransactionBuilder } from 'stellar-sdk'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { XlmSdkError } from '../xlm.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const xlmKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign Stellar pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param secret secret key to sign transaction with.
     * @param testnet mainnet or testnet version
     * @returns transaction data to be broadcast to blockchain.
     */
    async sign(tx: PendingTransaction, secret: string, testnet: boolean) {
      if (tx.chain !== Currency.XLM) {
        throw new XlmSdkError(SdkErrorCode.KMS_CHAIN_MISMATCH)
      }
      const transaction = TransactionBuilder.fromXDR(
        tx.serializedTransaction,
        testnet ? Networks.TESTNET : Networks.PUBLIC,
      )
      transaction.sign(Keypair.fromSecret(secret))
      return transaction.toEnvelope().toXDR().toString('base64')
    },
  }
}
