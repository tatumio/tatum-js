import {
  mintNFTWithUri as celoMintNFTWithUri,
  deployNFT as celoDeployNFT,
  mintMultipleNFTWithUri as celoMintMultipleNFTWithUri,
  burnNFT as celoBurnNFT,
  updateCashbackForAuthorNFT as celoUpdateCashbackForAuthorNFT,
  transferNFT as celoTransferNFT,
  CeloBurnErc721,
  CeloDeployErc721,
  CeloMintErc721,
  CeloMintMultipleErc721,
  CeloTransferErc721,
  CeloUpdateCashbackErc721,
} from '@tatumio/tatum-celo/src'
import {
  mintNFTWithUri as ethMintNFTWithUri,
  deployNFT as ethDeployNFT,
  mintMultipleNFTWithUri as ethMintMultipleNFTWithUri,
  burnNFT as ethBurnNFT,
  updateCashbackForAuthorNFT as ethUpdateCashbackForAuthorNFT,
  transferNFT as ethTransferNFT,
  EthMintErc721,
  EthDeployErc721,
  EthMintMultipleErc721,
  EthBurnErc721,
  EthTransferErc721,
} from '@tatumio/tatum-eth/src'
import {
  mintNFTWithUri as polygonMintNFTWithUri,
  deployNFT as polygonDeployNFT,
  mintMultipleNFTWithUri as polygonMintMultipleNFTWithUri,
  burnNFT as polygonBurnNFT,
  updateCashbackForAuthorNFT as polygonUpdateCashbackForAuthorNFT,
  transferNFT as polygonTransferNFT,
} from '@tatumio/tatum-polygon/src'
import {
  mintNFTWithUri as oneMintNFTWithUri,
  deployNFT as oneDeployNFT,
  mintMultipleNFTWithUri as oneMintMultipleNFTWithUri,
  burnNFT as oneBurnNFT,
  updateCashbackForAuthorNFT as oneUpdateCashbackForAuthorNFT,
  transferNFT as oneTransferNFT,
  OneMint721,
} from '@tatumio/tatum-one/src'
import {
  mintNFTWithUri as tronMintNFTWithUri,
  deployNFT as tronDeployNFT,
  mintMultipleNFTWithUri as tronMintMultipleNFTWithUri,
  burnNFT as tronBurnNFT,
  updateCashbackForAuthorNFT as tronUpdateCashbackForAuthorNFT,
  transferNFT as tronTransferNFT,
  TronBurnTrc721,
  TronDeployTrc721,
  TronMintTrc721,
  TronTransferTrc721,
  TronUpdateCashbackTrc721,
} from '@tatumio/tatum-tron/src'
import {
  mintNFTWithUri as bscMintNFTWithUri,
  deployNFT as bscDeployNFT,
  mintNFTWithUri as bscMintMultipleNFTWithUri,
  burnNFT as bscBurnNFT,
  updateCashbackForAuthorNFT as bscUpdateCashbackForAuthorNFT,
  transferNFT as bscTransferNFT,
} from '@tatumio/tatum-bsc/src'
import {
  mintNFTWithUri as flowMintNFTWithUri,
  deployNFT as flowDeployNFT,
  mintMultipleNFTWithUri as flowMintMultipleNFTWithUri,
  burnNFT as flowBurnNFT,
  transferNFT as flowTransferNFT,
  FlowBurnNft,
  FlowDeployNft,
  FlowMintMultipleNft,
  FlowMintNft,
  FlowTransferNft,
} from '@tatumio/tatum-flow/src'
import { TransactionHash, Currency, UpdateCashbackErc721, MintMultipleErc721 } from '@tatumio/tatum-core'
import { mintNFTRequest, createNFTAbstraction } from '@tatumio/tatum-defi'
import { TronMintMultipleTrc721 } from '@tatumio/tatum-tron'

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
      return ethDeployNFT(body as EthDeployErc721 & { chain: Currency.ETH }, provider)
    case Currency.MATIC:
      return polygonDeployNFT(testnet, body as EthDeployErc721, provider)
    case Currency.ONE:
      return oneDeployNFT(testnet, body as EthDeployErc721, provider)
    case Currency.TRON:
      return tronDeployNFT(testnet, body as TronDeployTrc721)
    case Currency.BSC:
      return bscDeployNFT(testnet, body as EthDeployErc721, provider)
    case Currency.FLOW:
      return flowDeployNFT(testnet, body as FlowDeployNft, provider)
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
      return tronMintNFTWithUri(testnet, body as TronMintTrc721, provider)
    case Currency.BSC:
      return bscMintNFTWithUri(testnet, body, provider)
    case Currency.FLOW:
      return flowMintNFTWithUri(testnet, body as FlowMintNft, provider)
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
  body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft | TronMintMultipleTrc721,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.TRON:
      return tronMintMultipleNFTWithUri(testnet, body as TronMintMultipleTrc721, provider)
    case Currency.ETH:
      return ethMintMultipleNFTWithUri(body as EthMintMultipleErc721, provider)
    case Currency.MATIC:
      return polygonMintMultipleNFTWithUri(testnet, body as MintMultipleErc721, provider)
    case Currency.ONE:
      return oneMintMultipleNFTWithUri(testnet, body as MintMultipleErc721, provider)
    case Currency.BSC:
      return bscMintMultipleNFTWithUri(testnet, body, provider)
    case Currency.FLOW:
      return flowMintMultipleNFTWithUri(testnet, body as FlowMintMultipleNft, provider)
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
      return tronBurnNFT(testnet, body as TronBurnTrc721, provider)
    case Currency.ETH:
      return ethBurnNFT(body, provider)
    case Currency.MATIC:
      return polygonBurnNFT(testnet, body, provider)
    case Currency.ONE:
      return oneBurnNFT(testnet, body, provider)
    case Currency.BSC:
      return bscBurnNFT(testnet, body, provider)
    case Currency.FLOW:
      return flowBurnNFT(testnet, body as FlowBurnNft, provider)
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
      return ethUpdateCashbackForAuthorNFT(body, provider)
    case Currency.MATIC:
      return polygonUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.ONE:
      return oneUpdateCashbackForAuthorNFT(testnet, body, provider)
    case Currency.TRON:
      return tronUpdateCashbackForAuthorNFT(testnet, body as TronUpdateCashbackTrc721, provider)
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
      return ethTransferNFT(body, provider)
    case Currency.MATIC:
      return polygonTransferNFT(testnet, body, provider)
    case Currency.ONE:
      return oneTransferNFT(testnet, body, provider)
    case Currency.TRON:
      return tronTransferNFT(testnet, body as TronTransferTrc721, provider)
    case Currency.BSC:
      return bscTransferNFT(testnet, body, provider)
    case Currency.FLOW:
      return flowTransferNFT(testnet, body as FlowTransferNft, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-defi'
