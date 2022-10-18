import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { RippleAPI } from 'ripple-lib'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { XrpSdkError } from '../xrp.sdk.errors'

export const xrpKmsService = (args: { blockchain: Blockchain }) => {
  const rippleAPI = new RippleAPI()
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign Xrp pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param secret secret key to sign transaction with.
     * @returns transaction data to be broadcast to blockchain.
     */
    async sign(tx: ChainTransactionKMS, secret: string) {
      const typedTx = tx as PendingTransaction
      if (typedTx.chain !== Currency.XRP) {
        throw new XrpSdkError(SdkErrorCode.KMS_CHAIN_MISMATCH)
      }
      return rippleAPI.sign(tx.serializedTransaction, secret).signedTransaction
    },
  }
}
