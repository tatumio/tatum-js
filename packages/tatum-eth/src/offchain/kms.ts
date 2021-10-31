import { post, SignatureId, TransferOffchainKMS } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/ethereum/transfer`, body, TransferOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthTransferErc20" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferEthErc20KMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/ethereum/erc20/transfer`, body, TransferOffchainKMS)
