import { BlockchainNftService, TransactionHash } from '@tatumio/api-client'

type MintNftWithUriFn<Body> = (
  body: Body,
  options?: { provider?: string; testnet?: boolean },
) => Promise<TransactionHash>

export const abstractSdkNftService = () => {
  return {
    mintNFT: BlockchainNftService.nftMintErc721,
    getNFTTransaction: BlockchainNftService.nftGetTransactErc721,
    getNFTTransactionsByToken: BlockchainNftService.nftGetTransactionByToken,
    getNFTTransactionsByAddress: BlockchainNftService.nftGetTransactionByAddress,
    getNFTsByAddress: BlockchainNftService.nftGetBalanceErc721,
    getNFTProvenanceData: BlockchainNftService.nftGetProvenanceDataErc721,
    getNFTMetadataURI: BlockchainNftService.nftGetMetadataErc721,
    getNFTRoyalty: BlockchainNftService.nftGetRoyaltyErc721,
    prepareAddNFTMinterAbstraction: BlockchainNftService.nftGetRoyaltyErc721,
  }
}
