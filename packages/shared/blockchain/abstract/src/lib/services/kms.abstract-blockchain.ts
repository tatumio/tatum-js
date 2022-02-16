import { Blockchain, blockchainHelper } from '@tatumio/shared-core'
import { ApiServices, CancelablePromise, PendingTransaction } from '@tatumio/api-client'
import { abstractSdkKms } from '@tatumio/shared-abstract-sdk'

export const abstractBlockchainKms = (args: { blockchain: Blockchain }) => {
  const superObject = abstractSdkKms()

  return {
    ...superObject,
    /**
     * Get pending transactions to sign
     * <h4>1 credit per API call.</h4><br/><p>Get list of pending transaction to be signed and broadcast using Tatum KMS.</p>
     * @param signatures Signature IDs of the KMS which invokes this endpoint. If multiple, they should be separated by comma.
     * @returns PendingTransaction OK
     * @throws ApiError
     */
    getAllPending(signatures?: string): CancelablePromise<PendingTransaction[]> {
      return ApiServices.kms.getPendingTransactionsToSign(
        // @ts-ignore @TODO
        blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain),
      )
    },
  }
}
