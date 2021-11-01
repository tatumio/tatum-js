import {get, axios, post} from 'packages/tatum-core/src'
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    CeloUpdateCashbackErc721,
    Currency,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    FlowBurnNft,
    FlowDeployNft,
    FlowMintMultipleNft,
    FlowMintNft,
    FlowTransferNft,
    OneMint721,
    TransactionHash,
    TronBurnTrc721,
    TronDeployTrc721,
    TronMintMultipleTrc721,
    TronMintTrc721,
    TronTransferTrc721,
    TronUpdateCashbackTrc721,
    UpdateCashbackErc721,
} from '../model';
import {
    sendTronBurnTrc721SignedTransaction,
    sendTronDeployTrc721SignedTransaction,
    sendTronMintCashbackTrc721SignedTransaction,
    sendTronMintMultipleTrc721SignedTransaction,
    sendTronMintTrc721SignedTransaction,
    sendTronTransferTrc721SignedTransaction,
    sendTronUpdateCashbackForAuthorTrc721SignedTransaction,
} from '../transaction';
import {ipfsUpload} from "../../../tatum-core/src";

export const mintNFT = (body: CeloMintErc721 | EthMintErc721 | OneMint721): Promise<TransactionHash> => post(`/v3/nft/mint`, body);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (chain: Currency, contractAddress: string, address: string): Promise<string[]> =>
    get(`/v3/nft/balance/${chain}/${contractAddress}/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
    get(`/v3/nft/address/${chain}/${txId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (chain: Currency, contractAddress: string, tokenId: string, account?: string): Promise<{ data: string }> => {
    let url = `/v3/nft/metadata/${chain}/${contractAddress}/${tokenId}`;
    if (account) {
        url += `?account=${account}`;
    }
    return get(url);
};

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param chain chain where NFT token is
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (chain: Currency, contractAddress: string, tokenId: string, account?: string): Promise<{ originalUrl: string, publicUrl: string }> => {
    const {data: metadata} = await getNFTMetadataURI(chain, contractAddress, tokenId, account);
    const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadata.replace('ipfs://', '')}`;
    const {data} = await axios.get(metadataUrl);
    const imageUrl = data.image;
    return {
        originalUrl: imageUrl,
        publicUrl: `https://gateway.pinata.cloud/ipfs/${imageUrl.replace('ipfs://', '')}`
    };
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> => get(`/v3/nft/royalty/${chain}/${contractAddress}/${tokenId}`);

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: CeloDeployErc721 | EthDeployErc721 | TronDeployTrc721 | FlowDeployNft, provider?: string): Promise<TransactionHash> => {
    return sendTronDeployTrc721SignedTransaction(testnet, body as TronDeployTrc721);
};

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
export const createNFT = async (testnet: boolean, body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
                                file: Buffer,
                                name: string,
                                description?: string,
                                scheme?: any, provider?: string) => {
    const metadata = scheme || {};
    metadata.name = name;
    if (description) {
        metadata.description = description;
    }
    const {ipfsHash} = await ipfsUpload(file, name);
    metadata.image = `ipfs://${ipfsHash}`;
    const {ipfsHash: metadataHash} = await ipfsUpload(Buffer.from(JSON.stringify(metadata)), 'metadata.json');
    body.url = `ipfs://${metadataHash}`;
    if (body.chain === Currency.FLOW) {
        (body as any).privateKey = (body as any).privateKey || (body as any).fromPrivateKey;
    }
    const result = await mintNFTWithUri(testnet, body, provider);
    return {
        tokenId: (body as any).tokenId,
        // @ts-ignore
        ...result,
        metadataUrl: body.url,
        metadataPublicUrl: `https://gateway.pinata.cloud/ipfs/${metadataHash}`,
        imageUrl: `ipfs://${ipfsHash}`,
        imagePublicUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    };
};

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (testnet: boolean, body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft, provider?: string): Promise<TransactionHash> => {
    if ((body as TronMintTrc721).authorAddresses) {
        return sendTronMintCashbackTrc721SignedTransaction(testnet, body as TronMintTrc721);
    } else {
        return sendTronMintTrc721SignedTransaction(testnet, body as TronMintTrc721);
    }
};

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft, provider?: string) => {
    if ((body as TronMintMultipleTrc721).authorAddresses) {
        throw new Error('Unsupported operation.');
    } else {
        return sendTronMintMultipleTrc721SignedTransaction(testnet, body as TronMintMultipleTrc721);
    }
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: CeloBurnErc721 | EthBurnErc721 | TronBurnTrc721 | FlowBurnNft, provider?: string) => {
    return sendTronBurnTrc721SignedTransaction(testnet, body as TronBurnTrc721);
};

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721 | TronUpdateCashbackTrc721 | CeloUpdateCashbackErc721, provider?: string) => {
    return sendTronUpdateCashbackForAuthorTrc721SignedTransaction(testnet, body as TronUpdateCashbackTrc721);
};

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: CeloTransferErc721 | EthTransferErc721 | TronTransferTrc721 | FlowTransferNft, provider?: string) => {
    return sendTronTransferTrc721SignedTransaction(testnet, body as TronTransferTrc721);
};
