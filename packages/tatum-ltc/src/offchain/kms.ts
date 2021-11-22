import { post } from '@tatumio/tatum-core'
import { SignatureId, TransferBtcBasedOffchainKMS } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferLtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/litecoin/transfer`, body, TransferBtcBasedOffchainKMS)
