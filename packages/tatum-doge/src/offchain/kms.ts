import { post, SignatureId } from '@tatumio/tatum-core'
import { TransferBtcBasedOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferDogeKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/dogecoin/transfer`, body, TransferBtcBasedOffchainKMS);
