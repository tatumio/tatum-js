import { TransferBtcBasedOffchainKMS } from '../model/request/TransferBtcBasedOffchainKMS';
import { TransferEthErc20OffchainKMS } from '../model/request/TransferEthErc20OffchainKMS';
import { TransferEthOffchainKMS } from '../model/request/TransferEthOffchainKMS';
import { SignatureId } from '../model/response/common/SignatureId';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferBtcKMS: (body: TransferBtcBasedOffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferLtcKMS: (body: TransferBtcBasedOffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferBcashKMS: (body: TransferBtcBasedOffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferEthKMS: (body: TransferEthOffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransferErc20" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferEthErc20KMS: (body: TransferEthErc20OffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferXlmKMS: (body: TransferBtcBasedOffchainKMS) => Promise<SignatureId>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export declare const offchainTransferXrpKMS: (body: TransferBtcBasedOffchainKMS) => Promise<SignatureId>;
