import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction } from '@tatumio/api-client'
import { Keypair, Networks, TransactionBuilder } from 'stellar-sdk'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

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
    async sign(tx: ChainTransactionKMS, secret: string, testnet: boolean) {
      (tx as PendingTransaction).chain = 'XLM' as any
      const transaction = TransactionBuilder.fromXDR(
        tx.serializedTransaction,
        testnet ? Networks.TESTNET : Networks.PUBLIC,
      )
      transaction.sign(Keypair.fromSecret(secret))
      return transaction.toEnvelope().toXDR().toString('base64')
    },
  }
}
