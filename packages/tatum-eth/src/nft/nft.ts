import { axios, Currency, get, ipfsUpload, post, TransactionHash, UpdateCashbackErc721 } from '@tatumio/tatum-core';
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

export const mintNFT = (body: EthMintErc721 ) => post(`/v3/nft/mint`, body)

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
export const deployNFT = async (testnet: boolean, body: EthDeployErc721 & { chain: Currency.ETH}, provider?: string): Promise<TransactionHash> => {
    switch (body.chain) {
        case Currency.ETH:
            return sendDeployErc721Transaction(body as EthDeployErc721, provider);
        default:
            throw new Error('Unsupported currency');
    }
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
// TODO: Probably move to core
export const createNFT = async (testnet: boolean, body: EthMintErc721 & { chain: Currency.ETH },
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
    /* if (body.chain === Currency.FLOW) {
        (body as any).privateKey = (body as any).privateKey || (body as any).fromPrivateKey;
    } */
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
export const mintNFTWithUri = async (testnet: boolean, body: EthMintErc721 & { chain: Currency.ETH }, provider?: string) => {
    switch (body.chain) {
        case Currency.ETH:
            if ((body as EthMintErc721).authorAddresses) {
                return sendMintCashbackErc721Transaction(body as EthMintErc721, provider);
            } else {
                return sendMintErc721Transaction(body as EthMintErc721, provider);
            }
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: EthMintMultipleErc721 & { chain: Currency.ETH }, provider?: string) => {
    switch (body.chain) {
        case Currency.ETH:
            if ((body as EthMintMultipleErc721).authorAddresses) {
                return sendEthMintMultipleCashbackErc721SignedTransaction(body as EthMintMultipleErc721, provider);
            } else {
                return sendMintMultipleErc721Transaction(body as EthMintMultipleErc721, provider);
            }
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: EthBurnErc721 & { chain: Currency.ETH }, provider?: string) => {
    switch (body.chain) {
        case Currency.ETH:
            return sendBurnErc721Transaction(body, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721 & { chain: Currency.ETH }, provider?: string) => {
    switch (body.chain) {
        case Currency.ETH:
            return sendUpdateCashbackForAuthorErc721Transaction(body, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: EthTransferErc721 & { chain: Currency.ETH }, provider?: string) => {
    switch (body.chain) {
        case Currency.ETH:
            return sendErc721Transaction(body, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};
