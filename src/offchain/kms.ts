import {post} from '../connector/tatum'
import {SignatureId} from '../model'
import {TransferBtcBasedOffchainKMS} from '../model/request/TransferBtcBasedOffchainKMS'
import {TransferEthOffchainKMS} from '../model/request/TransferEthOffchainKMS'
import {TransferXlmOffchainKMS} from '../model/request/TransferXlmOffchainKMS'
import {TransferXrpOffchainKMS} from '../model/request/TransferXrpOffchainKMS'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/bitcoin/transfer`, body, TransferBtcBasedOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferLtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/litecoin/transfer`, body, TransferBtcBasedOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBcashKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/bcash/transfer`, body, TransferBtcBasedOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthKMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/ethereum/transfer`, body, TransferEthOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransferErc20" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthErc20KMS = async (body: TransferEthOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/ethereum/erc20/transfer`, body, TransferEthOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXlmKMS = async (body: TransferXlmOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/xlm/transfer`, body, TransferXlmOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXrpKMS = async (body: TransferXrpOffchainKMS): Promise<SignatureId> =>
    post(`/v3/offchain/xrp/transfer`, body, TransferXrpOffchainKMS)
