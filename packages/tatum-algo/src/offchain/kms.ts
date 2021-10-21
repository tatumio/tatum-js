import { post, TransferOffchainKMS, SignatureId } from "@tatumio/tatum-core";

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferAlgorandKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/algorand/transfer`, body, TransferOffchainKMS);
