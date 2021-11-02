import { post, SignatureId } from '@tatumio/tatum-core'
import { TransferBtcBasedOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferAdaKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/ada/transfer`, body, TransferBtcBasedOffchainKMS)
