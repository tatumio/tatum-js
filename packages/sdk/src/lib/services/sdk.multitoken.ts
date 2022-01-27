import { BlockchainMultiTokenErc1155Service } from '@tatumio/api-client'

export const sdkMultiToken = () => {
  return {
    deployMultiTokenSmartContract: BlockchainMultiTokenErc1155Service.deployMultiToken,
    mintMultiToken: BlockchainMultiTokenErc1155Service.mintMultiToken,
    mintMultiTokenBatch: BlockchainMultiTokenErc1155Service.mintMultiTokenBatch,
    burnMultiToken: BlockchainMultiTokenErc1155Service.burnMultiToken,
    burnMultiTokenBatch: BlockchainMultiTokenErc1155Service.burnMultiTokenBatch,
    transferMultiToken: BlockchainMultiTokenErc1155Service.transferMultiToken,
    transferMultiTokenBatch: BlockchainMultiTokenErc1155Service.transferMultiTokenBatch,
    addMultiTokenMinter: BlockchainMultiTokenErc1155Service.addMultiTokenMinter,
    getMultiTokensByAddress: BlockchainMultiTokenErc1155Service.multiTokenGetAddressBalance,
    getMultiTokenTransactionsByAddress: BlockchainMultiTokenErc1155Service.multiTokenGetTransactionByAddress,
    getMultiTokensBalance: BlockchainMultiTokenErc1155Service.multiTokenGetBalance,
    getMultiTokensBatchBalance: BlockchainMultiTokenErc1155Service.multiTokenGetBalanceBatch,
    getMultiTokenTransaction: BlockchainMultiTokenErc1155Service.multiTokenGetTransaction,
    getMultiTokenMetadata: BlockchainMultiTokenErc1155Service.multiTokenGetMetadata,
  }
}
