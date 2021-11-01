import {
    SignatureId,
    TransferTrxOffchain,
} from '../model';
import {post} from "../../../tatum-core/src";

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferTronKMS = async (body: TransferTrxOffchain): Promise<SignatureId> =>
    post(`/v3/offchain/tron/transfer`, body, TransferTrxOffchain);
