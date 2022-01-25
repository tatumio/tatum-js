import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction } from '@tatumio/api-client'
import { RippleAPI } from 'ripple-lib'

export const xrpKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign Xrp pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param secret secret key to sign transaction with.
     * @returns transaction data to be broadcast to blockchain.
     */
    async sign(tx: ChainTransactionKMS, secret: string) {
      ;(tx as PendingTransaction).chain = 'XRP' as any
      const rippleAPI = new RippleAPI()
      return rippleAPI.sign(tx.serializedTransaction, secret).signedTransaction
    },
  }
}
