import { post, SignatureId } from '@tatumio/tatum-core'
import {TransferEthOffchainKMS} from '@tatumio/tatum-core/src/model/request/TransferEthOffchainKMS'

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
