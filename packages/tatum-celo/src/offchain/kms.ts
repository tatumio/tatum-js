import { TransferOffchainKMS, SignatureId, post } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloOrErc20Transfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferCeloKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/celo/transfer`, body, TransferOffchainKMS)
