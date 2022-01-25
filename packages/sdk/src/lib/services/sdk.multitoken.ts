import { BlockchainMultiTokenErc1155Service } from '@tatumio/api-client'

export const sdkMultiToken = () => {
  return {
    getMultiTokenTransactionsByAddress: BlockchainMultiTokenErc1155Service.multiTokenGetTransactionByAddress,
    getMultiTokensBalance: BlockchainMultiTokenErc1155Service.multiTokenGetBalance,
    getMultiTokensBatchBalance: BlockchainMultiTokenErc1155Service.multiTokenGetBalanceBatch,
    getMultiTokenTransaction: BlockchainMultiTokenErc1155Service.multiTokenGetTransaction,
    getMultiTokenMetadata: BlockchainMultiTokenErc1155Service.multiTokenGetMetadata,
  }
}
