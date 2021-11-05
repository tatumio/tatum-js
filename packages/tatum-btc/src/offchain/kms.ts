import { post, SignatureId } from '@tatumio/tatum-core'
import { TransferBtcBasedOffchainKMS } from '@tatumio/tatum-core/src/model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/bitcoin/transfer`, body, TransferBtcBasedOffchainKMS);