import { post, SignatureId } from '@tatumio/tatum-core'
import { TransferXlmOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXlmKMS = async (body: TransferXlmOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/xlm/transfer`, body, TransferXlmOffchainKMS)
