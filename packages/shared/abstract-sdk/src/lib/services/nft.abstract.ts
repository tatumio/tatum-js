import {
  AddNftMinter,
  AddNftMinterKMS,
  NftErc721OrCompatibleService,
  NftMetadataErc721,
  NftMetadataErc721OnchainSolana,
} from '@tatumio/api-client'
import { httpHelper } from '@tatumio/shared-core'

type ChainAddMinter = AddNftMinter | AddNftMinterKMS

export const abstractSdkNftService = () => {
  return {
    deployNFTSmartContract: NftErc721OrCompatibleService.nftDeployErc721,
    addNFTMinter: NftErc721OrCompatibleService.nftAddMinter,
    mintNFT: NftErc721OrCompatibleService.nftMintErc721,
    mintMultipleNFTs: NftErc721OrCompatibleService.nftMintMultipleErc721,
    burnNFT: NftErc721OrCompatibleService.nftBurnErc721,
    transferNFT: NftErc721OrCompatibleService.nftTransferErc721,
    getNFTTransaction: NftErc721OrCompatibleService.nftGetTransactErc721,
    getNFTTransactionsByToken: NftErc721OrCompatibleService.nftGetTransactionByToken,
    getNFTTransactionsByAddress: NftErc721OrCompatibleService.nftGetTransactionByAddress,
    getNFTsByAddress: NftErc721OrCompatibleService.nftGetTokensByAddressErc721,
    getNFTMetadataURI: NftErc721OrCompatibleService.nftGetMetadataErc721,
    getNFTAccountBalance: NftErc721OrCompatibleService.nftGetBalanceErc721,
    getNFTContractAddress: NftErc721OrCompatibleService.nftGetContractAddress,
    getNFTImage: async (
      chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
      contractAddress: string,
      tokenId: string,
      account?: string,
    ): Promise<{ originalUrl: string; publicUrl: string } | null> => {
      const response = await NftErc721OrCompatibleService.nftGetMetadataErc721(
        chain,
        contractAddress,
        tokenId,
        account,
      )

      let metadata

      if (chain === 'SOL') {
        metadata = (response as NftMetadataErc721OnchainSolana)?.onchainData?.uri
      } else {
        metadata = (response as NftMetadataErc721)?.data
      }

      if (!metadata) return null

      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadata?.replace('ipfs://', '')}`
      const { data } = await httpHelper.get(metadataUrl)
      const imageUrl = data.image
      return {
        originalUrl: imageUrl,
        publicUrl: `https://gateway.pinata.cloud/ipfs/${imageUrl.replace('ipfs://', '')}`,
      }
    },
    prepareAddNftMinterAbstraction: (body: ChainAddMinter) => {
      return ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', body.minter]
    },
  }
}
