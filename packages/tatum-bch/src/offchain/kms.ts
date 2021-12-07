import { post, SignatureId, TransferBtcBasedOffchainKMS } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/bcash/transfer`, body, TransferBtcBasedOffchainKMS)
