import {post} from '../connector/tatum';
import {
    EgldTransferOffchain,
    SignatureId,
    TransferBtcBasedOffchainKMS,
    TransferEthOffchainKMS,
    TransferTrxOffchain,
    TransferXlmOffchainKMS,
    TransferXrpOffchainKMS
} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/bitcoin/transfer`, body, TransferBtcBasedOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferLtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/litecoin/transfer`, body, TransferBtcBasedOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBcashKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/bcash/transfer`, body, TransferBtcBasedOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/ethereum/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransferErc20" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthErc20KMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/ethereum/erc20/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXlmKMS = async (body: TransferXlmOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/xlm/transfer`, body, TransferXlmOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXrpKMS = async (body: TransferXrpOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/xrp/transfer`, body, TransferXrpOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferAdaKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/ada/transfer`, body, TransferBtcBasedOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscOrBepTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBscKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/bsc/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloOrErc20Transfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferCeloKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/celo/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferDogeKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/dogecoin/transfer`, body, TransferBtcBasedOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferPolygonKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/polygon/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferTronKMS = async (body: TransferTrxOffchain): Promise<SignatureId> =>
    post(`/v3/offchain/tron/transfer`, body, TransferTrxOffchain);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXdcKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/xdc/transfer`, body, TransferEthOffchainKMS);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEgldKMS = async (body: EgldTransferOffchain): Promise<SignatureId> =>
    post(`/v3/offchain/egld/transfer`, body, EgldTransferOffchain);
