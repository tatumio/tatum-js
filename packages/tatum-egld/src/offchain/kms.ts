import {post, SignatureId} from '@tatumio/tatum-core';
import {EgldTransferOffchain} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEgldKMS = async (body: EgldTransferOffchain): Promise<SignatureId> =>
    post(`/v3/offchain/egld/transfer`, body, EgldTransferOffchain);
