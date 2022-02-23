import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { egldUtils } from '../utils/egld.utils'

export const egldKmsService = (args: { apiKey: string; blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign EGLD pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param fromPrivateKey private key to sign transaction with.
     * @returns transaction data to be broadcast to blockchain.
     */
    sign: async (tx: ChainTransactionKMS, fromPrivateKey: string) => {
      const txWithChain = { ...tx, chain: Blockchain.EGLD }
      const transaction = JSON.parse(txWithChain.serializedTransaction)
      return await egldUtils(args.apiKey).prepareSignedTransactionAbstraction(
        transaction,
        undefined,
        fromPrivateKey,
      )
    },
  }
}
