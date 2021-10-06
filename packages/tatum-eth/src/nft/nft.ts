import { Currency, TransactionHash, UpdateCashbackErc721, MintErc721, createNFTAbstraction, mintNFTRequest } from '@tatumio/tatum-core';
import {
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721
} from '../model';
import {
    sendBurnErc721Transaction,
    sendDeployErc721Transaction,
    sendErc721Transaction,
    sendEthMintMultipleCashbackErc721SignedTransaction,
    sendMintCashbackErc721Transaction,
    sendMintErc721Transaction,
    sendMintMultipleErc721Transaction,
    sendUpdateCashbackForAuthorErc721Transaction
} from '../transaction';

export const mintNFT = (body: EthMintErc721) => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: EthDeployErc721 & { chain: Currency.ETH}, provider?: string): Promise<TransactionHash> => {
    return sendDeployErc721Transaction(body as EthDeployErc721, provider);
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
 export const createNFT = async (
    body: MintErc721,
    file: Buffer,
    name: string,
    description?: string,
    scheme?: any, 
    provider?: string) => {
    
    return await createNFTAbstraction(
        mintNFTWithUri,
        body,
        file,
        name,
        description,
        scheme,
        provider
    )
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: EthMintErc721 & { chain: Currency.ETH }, provider?: string) => {
    if ((body as EthMintErc721).authorAddresses) {
        return sendMintCashbackErc721Transaction(body as EthMintErc721, provider);
    } else {
        return sendMintErc721Transaction(body as EthMintErc721, provider);
    }
};

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: EthMintMultipleErc721 & { chain: Currency.ETH }, provider?: string) => {
    if ((body as EthMintMultipleErc721).authorAddresses) {
        return sendEthMintMultipleCashbackErc721SignedTransaction(body as EthMintMultipleErc721, provider);
    } else {
        return sendMintMultipleErc721Transaction(body as EthMintMultipleErc721, provider);
    }
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: EthBurnErc721 & { chain: Currency.ETH }, provider?: string) => {
    return sendBurnErc721Transaction(body, provider);
};

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721 & { chain: Currency.ETH }, provider?: string) => {
    return sendUpdateCashbackForAuthorErc721Transaction(body, provider);
};

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: EthTransferErc721 & { chain: Currency.ETH }, provider?: string) => {
    return sendErc721Transaction(body, provider);
};

export { 
    getNFTsByAddress,
    getNFTContractAddress,
    getNFTMetadataURI,
    getNFTImage,
    getNFTRoyalty,
 } from "@tatumio/tatum-core"
