import {
    mintNFTRequest,
} from '@tatumio/tatum-defi'
import {
    MintErc721
} from '@tatumio/tatum-core'

export const mintNFT = (body: MintErc721) => mintNFTRequest(body)

export {
    getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty
} from '@tatumio/tatum-defi'