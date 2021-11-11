import {
  mintNFTWithUri as celoMintNFTWithUri,
  deployNFT as celoDeployNFT,
  mintMultipleNFTWithUri as celoMintMultipleNFTWithUri,
  burnNFT as celoBurnNFT,
  updateCashbackForAuthorNFT as celoUpdateCashbackForAuthorNFT,
  transferNFT as celoTransferNFT,
} from '@tatumio/tatum-celo'
import {
  mintNFTWithUri as ethMintNFTWithUri,
  deployNFT as ethDeployNFT,
  mintNFTWithUri as ethMintMultipleNFTWithUri,
  burnNFT as ethBurnNFT,
  updateCashbackForAuthorNFT as ethUpdateCashbackForAuthorNFT,
  transferNFT as ethTransferNFT,
} from '@tatumio/tatum-eth'
import {
  mintNFTWithUri as polygonMintNFTWithUri,
  deployNFT as polygonDeployNFT,
  mintNFTWithUri as polygonMintMultipleNFTWithUri,
  burnNFT as polygonBurnNFT,
  updateCashbackForAuthorNFT as polygonUpdateCashbackForAuthorNFT,
  transferNFT as polygonTransferNFT,
} from '@tatumio/tatum-polygon'
import {
  mintNFTWithUri as oneMintNFTWithUri,
  deployNFT as oneDeployNFT,
  mintNFTWithUri as oneMintMultipleNFTWithUri,
  burnNFT as oneBurnNFT,
  updateCashbackForAuthorNFT as oneUpdateCashbackForAuthorNFT,
  transferNFT as oneTransferNFT,
} from '@tatumio/tatum-one'
import {
  mintNFTWithUri as tronMintNFTWithUri,
  deployNFT as tronDeployNFT,
  mintNFTWithUri as tronMintMultipleNFTWithUri,
  burnNFT as tronBurnNFT,
  updateCashbackForAuthorNFT as tronUpdateCashbackForAuthorNFT,
  transferNFT as tronTransferNFT,
} from '@tatumio/tatum-tron'
import {
  mintNFTWithUri as bscMintNFTWithUri,
  deployNFT as bscDeployNFT,
  mintNFTWithUri as bscMintMultipleNFTWithUri,
  burnNFT as bscBurnNFT,
  updateCashbackForAuthorNFT as bscUpdateCashbackForAuthorNFT,
  transferNFT as bscTransferNFT,
} from '@tatumio/tatum-bsc'
import {
  mintNFTWithUri as flowMintNFTWithUri,
  deployNFT as flowDeployNFT,
  mintNFTWithUri as flowMintMultipleNFTWithUri,
  burnNFT as flowBurnNFT,
  transferNFT as flowTransferNFT,
} from '@tatumio/tatum-flow'

export const mintNFT = (body: CeloMintErc721 | EthMintErc721 | OneMint721) => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (
  testnet: boolean,
  body: CeloDeployErc721 | EthDeployErc721 | TronDeployTrc721 | FlowDeployNft,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoDeployNFT(testnet, body as CeloDeployErc721, provider)
    case Currency.ETH:
      return ethDeployNFT(body as EthDeployErc721, provider)
    case Currency.MATIC:
      return polygonDeployNFT(testnet, body as EthDeployErc721, provider)
    case Currency.ONE:
      return oneDeployNFT(testnet, body as EthDeployErc721, provider)
    case Currency.TRON:
      return tronDeployNFT(testnet, body as TronDeployTrc721)
    case Currency.BSC:
      return bscDeployNFT(body as EthDeployErc721, provider)
    case Currency.FLOW:
      return flowDeployNFT(body as FlowDeployNft, provider)
    default:
      throw new Error('Unsupported currency')
  }
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (
  testnet: boolean,
  body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(() => mintNFTWithUri(testnet, body, provider), testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (
  testnet: boolean,
  body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoMintNFTWithUri(testnet, body, provider)
    case Currency.ETH:
      return ethMintNFTWithUri(testnet, body, provider)
    case Currency.MATIC:
      return polygonMintNFTWithUri(testnet, body, provider)
    case Currency.ONE:
      return oneMintNFTWithUri(testnet, body, provider)
    case Currency.TRON:
      return tronMintNFTWithUri(testnet, body, provider)
    case Currency.BSC:
      return bscMintNFTWithUri(testnet, body, provider)
    case Currency.FLOW:
      return flowMintNFTWithUri(testnet, body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (
  testnet: boolean,
  body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.TRON:
      return tronMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.ETH:
      return ethMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.MATIC:
      return polygonMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.ONE:
      return oneMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.BSC:
      return bscMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.FLOW:
      return flowMintMultipleNFTWithUri(testnet, body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: CeloBurnErc721 | EthBurnErc721 | TronBurnTrc721 | FlowBurnNft, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoBurnNFT(testnet, body, provider)
    case Currency.TRON:
      return tronBurnNFT(testnet, body, provider)
    case Currency.ETH:
      return ethBurnNFT(testnet, body, provider)
    case Currency.MATIC:
      return polygonBurnNFT(testnet, body, provider)
    case Currency.ONE:
      return oneBurnNFT(testnet, body, provider)
    case Currency.BSC:
      return bscBurnNFT(testnet, body, provider)
    case Currency.FLOW:
      return flowBurnNFT(testnet, body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (
  testnet: boolean,
  body: UpdateCashbackErc721 | TronUpdateCashbackTrc721 | CeloUpdateCashbackErc721,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.ETH:
      return ethUpdateCashbackForAuthorNFT(testnet, body)
    case Currency.MATIC:
      return polygonUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.ONE:
      return oneUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.TRON:
      return tronUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.BSC:
      return bscUpdateCashbackForAuthorNFT(testnet, body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (
  testnet: boolean,
  body: CeloTransferErc721 | EthTransferErc721 | TronTransferTrc721 | FlowTransferNft,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoTransferNFT(testnet, body, provider)
    case Currency.ETH:
      return ethTransferNFT(testnet, body, provider)
    case Currency.MATIC:
      return polygonTransferNFT(testnet, body, provider)
    case Currency.ONE:
      return oneTransferNFT(testnet, body, provider)
    case Currency.TRON:
      return tronTransferNFT(testnet, body, provider)
    case Currency.BSC:
      return bscTransferNFT(testnet, body, provider)
    case Currency.FLOW:
      return flowTransferNFT(testnet, body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-core'
