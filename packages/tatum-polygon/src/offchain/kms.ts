import { post, TransferOffchainKMS, SignatureId } from "@tatumio/tatum-core";

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferPolygonKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/polygon/transfer`, body, TransferOffchainKMS);

