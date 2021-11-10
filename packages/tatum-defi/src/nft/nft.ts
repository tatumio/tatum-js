import {
    BurnErc721,
    Currency,
    DeployErc721,
    MintErc721,
    MintMultipleErc721,
    TransactionHash,
    TransferErc721, UpdateCashbackErc721
} from "@tatumio/tatum-core"
import {getImplementationFor} from "src/utils";
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    CeloUpdateCashbackErc721
} from "@tatumio/tatum-celo";
import {FlowBurnNft, FlowDeployNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft} from "@tatumio/tatum-flow";
import {OneMint721} from "@tatumio/tatum-one";

/**
 * Mint new NFT token.
 * @param currency chain to work with
 * @param body body of the mint request
 */
export const mintNFT = async (currency: Currency, body: MintErc721 | OneMint721) => {
    const blockchainMintNFT = await getImplementationFor(currency, 'mintNFT')
    return await blockchainMintNFT(body)
}

/**
 * Create new NFT token.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (currency: Currency, testnet: boolean, body: DeployErc721 | CeloDeployErc721 | FlowDeployNft, provider?: string): Promise<TransactionHash> => {
    const blockchainDeployNFT = await getImplementationFor(currency, 'deployNFT')
    return await blockchainDeployNFT(testnet, body, provider)
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param currency chain to work with
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (
    currency: Currency,
    testnet: boolean,
    body: MintErc721 | CeloMintErc721 | FlowMintNft,
    file: Buffer,
    name: string,
    description?: string,
    scheme?: any,
    provider?: string
) => {
    const blockchainCreateNFT = await getImplementationFor(currency, 'createNFT')
    return await blockchainCreateNFT(testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param currency chain to work with
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (currency: Currency, testnet: boolean, body: MintErc721 | CeloMintErc721 | FlowMintNft, provider?: string): Promise<TransactionHash> => {
    const blockchainMintNFTWithUri = await getImplementationFor(currency, 'mintNFTWithUri')
    return await blockchainMintNFTWithUri(testnet, body, provider)
}

/**
 * Mint multiple new NFT tokens.
 * @param currency chain to work with
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (currency: Currency, testnet: boolean, body: MintMultipleErc721 | CeloMintMultipleErc721 | FlowMintMultipleNft, provider?: string) => {
    const blockchainMintMultipleNFTWithUri = await getImplementationFor(currency, 'mintMultipleNFTWithUri')
    return await blockchainMintMultipleNFTWithUri(testnet, body, provider)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body body of the burn request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (currency: Currency, testnet: boolean, body: BurnErc721 | CeloBurnErc721 | FlowBurnNft, provider?: string) => {
    const blockchainBurnNFT = await getImplementationFor(currency, 'burnNFT')
    return await blockchainBurnNFT(testnet, body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param currency chain to work with
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (currency: Currency, testnet: boolean, body: UpdateCashbackErc721 | CeloUpdateCashbackErc721, provider?: string) => {
    const blockchainUpdateCashbackForAuthorNFT = await getImplementationFor(currency, 'updateCashbackForAuthorNFT')
    return await blockchainUpdateCashbackForAuthorNFT(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (currency: Currency, testnet: boolean, body: TransferErc721 | CeloTransferErc721 | FlowTransferNft, provider?: string) => {
    const blockchainTransferNFT = await getImplementationFor(currency, 'transferNFT')
    return await blockchainTransferNFT(testnet, body, provider)
}

export {
    getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty
} from '@tatumio/tatum-core'
