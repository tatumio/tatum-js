import { MultiTokensErc1155OrCompatibleService } from '@tatumio/api-client'

export const sdkMultiToken = () => {
  return {
    getMultiTokenTransactionsByAddress:
      MultiTokensErc1155OrCompatibleService.multiTokenGetTransactionByAddress,
    getMultiTokensBalance: MultiTokensErc1155OrCompatibleService.multiTokenGetBalance,
    getMultiTokensBatchBalance: MultiTokensErc1155OrCompatibleService.multiTokenGetBalanceBatch,
    getMultiTokenTransaction: MultiTokensErc1155OrCompatibleService.multiTokenGetTransaction,
    getMultiTokenMetadata: MultiTokensErc1155OrCompatibleService.multiTokenGetMetadata,
  }
}
