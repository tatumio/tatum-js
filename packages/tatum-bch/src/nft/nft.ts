import { axios, get } from '@tatum/tatum-core';
import {
    Currency
} from '../model';

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
