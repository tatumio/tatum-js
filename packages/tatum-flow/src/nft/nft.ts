import {mintNFTRequest, createNFTAbstraction, TransactionHash, post, MintErc721} from '@tatumio/tatum-core';
import {
    FlowBurnNft,
    FlowDeployNft,
    FlowMintMultipleNft,
    FlowMintNft,
    FlowTransferNft,
} from '../model';
import {
    sendFlowNftBurnToken,
    sendFlowNftMintMultipleToken,
    sendFlowNftMintToken,
    sendFlowNftTransferToken,
} from '../transaction';

export const mintNFT = (body: MintErc721) => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 */
export const deployNFT = async (body: FlowDeployNft): Promise<TransactionHash> => {
    return post('/v3/nft/deploy', body, FlowDeployNft);
};

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (body: FlowMintNft,
                                file: Buffer,
                                name: string,
                                description?: string,
                                scheme?: any, provider?: string) => {
    return await createNFTAbstraction((body: any) => mintNFTWithUri(false, body), false, body, file, name, description, scheme, provider)
};

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const mintNFTWithUri = async (testnet: boolean, body: FlowMintNft): Promise<TransactionHash> => {
    return sendFlowNftMintToken(testnet, body);
};

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: FlowMintMultipleNft, provider?: string) => {
    return sendFlowNftMintMultipleToken(testnet, body as FlowMintMultipleNft);
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: FlowBurnNft, provider?: string) => {
    return sendFlowNftBurnToken(testnet, body as FlowBurnNft);
};

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: FlowTransferNft, provider?: string) => {
    return sendFlowNftTransferToken(testnet, body as FlowTransferNft);
};

export {
    getNFTsByAddress,
    getNFTContractAddress,
    getNFTMetadataURI,
    getNFTImage,
    getNFTRoyalty,
} from "@tatumio/tatum-core"
