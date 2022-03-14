import { AddNftMinter, AddNftMinterKMS, BlockchainNftService } from '@tatumio/api-client'
import axios from 'axios'

type ChainAddMinter = AddNftMinter | AddNftMinterKMS

export const abstractSdkNftService = () => {
  return {
    deployNFTSmartContract: BlockchainNftService.nftDeployErc721,
    addNFTMinter: BlockchainNftService.nftAddMinter,
    mintNFT: BlockchainNftService.nftMintErc721,
    mintMultipleNFTs: BlockchainNftService.nftMintMultipleErc721,
    burnNFT: BlockchainNftService.nftBurnErc721,
    transferNFT: BlockchainNftService.nftTransferErc721,
    updateNFTRoyalty: BlockchainNftService.nftUpdateCashbackErc721,
    getNFTTransaction: BlockchainNftService.nftGetTransactErc721,
    getNFTTransactionsByToken: BlockchainNftService.nftGetTransactionByToken,
    getNFTTransactionsByAddress: BlockchainNftService.nftGetTransactionByAddress,
    getNFTsByAddress: BlockchainNftService.nftGetBalanceErc721,
    getNFTProvenanceData: BlockchainNftService.nftGetProvenanceDataErc721,
    getNFTMetadataURI: BlockchainNftService.nftGetMetadataErc721,
    getNFTRoyalty: BlockchainNftService.nftGetRoyaltyErc721,
    getNFTAccountBalance: BlockchainNftService.nftGetBalanceErc721,
    getNFTImage: async (
      chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
      contractAddress: string,
      tokenId: string,
      account?: string,
    ): Promise<{ originalUrl: string; publicUrl: string }> => {
      const { data: metadata } = await BlockchainNftService.nftGetMetadataErc721(
        chain,
        contractAddress,
        tokenId,
        account,
      )
      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadata?.replace('ipfs://', '')}`
      const { data } = await axios.get(metadataUrl)
      const imageUrl = data.image
      return {
        originalUrl: imageUrl,
        publicUrl: `https://gateway.pinata.cloud/ipfs/${imageUrl.replace('ipfs://', '')}`,
      }
    },
    prepareAddNftMinterAbstraction: async (body: ChainAddMinter) => {
      return ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', body.minter]
    },
  }
}
