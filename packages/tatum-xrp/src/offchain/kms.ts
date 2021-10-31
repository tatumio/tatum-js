import { SignatureId, post } from '@tatumio/tatum-core'
import { TransferXrpOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXrpKMS = async (body: TransferXrpOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/xrp/transfer`, body, TransferXrpOffchainKMS)
