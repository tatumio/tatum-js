/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chain } from '../models/Chain';
import type { ChainEnum } from '../models/ChainEnum';
import type { ExcludeMetadata } from '../models/ExcludeMetadata';
import type { NftMetadata } from '../models/NftMetadata';
import type { NftMetadataURI } from '../models/NftMetadataURI';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { Token } from '../models/Token';
import type { TokenAddress } from '../models/TokenAddress';
import type { TokenId } from '../models/TokenId';
import type { TokenIds } from '../models/TokenIds';
import type { TokenTezos } from '../models/TokenTezos';
import type { TokenType } from '../models/TokenType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NftApiService {

    /**
     * Get tokens from a collection
     * <p><b>10 credits per API call</b></p>
     * <p>Get all NFTs (ERC-721 and ERC-1155) and multitokens (ERC-1155 only) of your favorite collections! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon / polygon-amoy</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * <li>Tezos - tezos-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and comma-separated list of collection addresses. Our API will return relevant information about each token, including its name, description, image, and more.</li>
     * <li>Aside from relevant information about each token, the response also contains metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to <code>true</code>).</li>
     * <li>If not specified, the API returns results for all supported types of tokens (nft, multitokens), but you can also choose to filter only one <code>tokenType</code>.</li>
     * <li>For Tezos blockchain query parameters <code>excludeMetadata</code> and <code>tokenType</code> won't have any effect on filtering data.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param collectionAddresses The blockchain addresses of the collections.
     * It is possible to enter list of up to 10 addresses as a comma separated string.
     *
     * @param tokenTypes The option to select only specific token types.
     * It is possible to enter list of multiple types as a comma separated string.
     * Use nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
     *
     * @param excludeMetadata The option to exclude metadata from the response.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns any OK
     * @throws ApiError
     */
    public static getCollectionsV4(
        chain: ChainEnum,
        collectionAddresses: TokenAddress,
        tokenTypes?: 'nft' | 'multitoken',
        excludeMetadata?: ExcludeMetadata,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Array<(Token | TokenTezos)>> {
        return __request({
            method: 'GET',
            path: `/v4/data/collections`,
            query: {
                'chain': chain,
                'collectionAddresses': collectionAddresses,
                'tokenTypes': tokenTypes,
                'excludeMetadata': excludeMetadata,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get tokens from a collection
     * <p><b>10 credits per API call</b></p>
     * <p>Get all NFTs (ERC-721 and ERC-1155) and multitokens (ERC-1155 only) of your favorite collections! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon / polygon-amoy</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * <li>Tezos - tezos-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and comma-separated list of collection addresses. Our API will return relevant information about each token, including its name, description, image, and more.</li>
     * <li>Aside from relevant information about each token, the response also contains metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to <code>true</code>).</li>
     * <li>If not specified, the API returns results for all supported types of tokens (nft, multitokens), but you can also choose to filter only one <code>tokenType</code>.</li>
     * <li>For Tezos blockchain query parameters <code>excludeMetadata</code> and <code>tokenType</code> won't have any effect on filtering data.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param collectionAddresses The blockchain addresses of the collections.
     * It is possible to enter list of up to 10 addresses as a comma separated string.
     *
     * @param tokenTypes The option to select only specific token types.
     * It is possible to enter list of multiple types as a comma separated string.
     * Use nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
     *
     * @param excludeMetadata The option to exclude metadata from the response.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns any OK
     * @throws ApiError
     */
    public static getCollections(
        chain: ChainEnum,
        collectionAddresses: TokenAddress,
        tokenTypes?: 'nft' | 'multitoken',
        excludeMetadata?: ExcludeMetadata,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Array<(Token | TokenTezos)>> {
        return __request({
            method: 'GET',
            path: `/v3/data/collections`,
            query: {
                'chain': chain,
                'collectionAddresses': collectionAddresses,
                'tokenTypes': tokenTypes,
                'excludeMetadata': excludeMetadata,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get token metadata
     * <p><b>5 credits per API call</b></p>
     * <p>Get metadata of NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) by IDs for a given token address! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name, token address and comma-separated list of IDs. Our API will return relevant metadata about each specified token, including its name, description, image, and more.</li>
     * <li>Aside from the metadata information, the response also contains token types and metadata url minted in each token.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the NFT to get metadata for.
     * @param tokenIds The IDs of the tokens to get metadata for.
     * It is possible to enter list of multiple IDs as a comma separated string.
     *
     * @returns any OK
     * @throws ApiError
     */
    public static getMetadataV4(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenIds: TokenIds,
    ): CancelablePromise<Array<{
        chain?: Chain;
        tokenId?: TokenId;
        tokenAddress?: TokenAddress;
        tokenType?: TokenType;
        metadataURI?: NftMetadataURI;
        metadata?: NftMetadata;
    }>> {
        return __request({
            method: 'GET',
            path: `/v4/data/metadata`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenIds': tokenIds,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get token metadata
     * <p><b>5 credits per API call</b></p>
     * <p>Get metadata of NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) by IDs for a given token address! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name, token address and comma-separated list of IDs. Our API will return relevant metadata about each specified token, including its name, description, image, and more.</li>
     * <li>Aside from the metadata information, the response also contains token types and metadata url minted in each token.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the NFT to get metadata for.
     * @param tokenIds The IDs of the tokens to get metadata for.
     * It is possible to enter list of multiple IDs as a comma separated string.
     *
     * @returns any OK
     * @throws ApiError
     */
    public static getMetadata(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenIds: TokenIds,
    ): CancelablePromise<Array<{
        chain?: Chain;
        tokenId?: TokenId;
        tokenAddress?: TokenAddress;
        tokenType?: TokenType;
        metadataURI?: NftMetadataURI;
        metadata?: NftMetadata;
    }>> {
        return __request({
            method: 'GET',
            path: `/v3/data/metadata`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenIds': tokenIds,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get owners of a token
     * <p><b>20 credits per API call</b></p>
     * <p>Get all addresses that own your favorite token (ERC-20, ERC-721 or ERC-1155)! Our API lets you search for all token owners on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and address of any fungible token, NFT or multitoken collection. Our API will return a list of addresses of all of their owners.</li>
     * <li>You can also get an owner of a specific NFT by specifying <code>tokenId</code>. In case of multitoken, result is an array of addresses.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns string OK
     * @throws ApiError
     */
    public static getOwnersV4(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v4/data/owners`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get owners of a token
     * <p><b>20 credits per API call</b></p>
     * <p>Get all addresses that own your favorite token (ERC-20, ERC-721 or ERC-1155)! Our API lets you search for all token owners on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and address of any fungible token, NFT or multitoken collection. Our API will return a list of addresses of all of their owners.</li>
     * <li>You can also get an owner of a specific NFT by specifying <code>tokenId</code>. In case of multitoken, result is an array of addresses.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns string OK
     * @throws ApiError
     */
    public static getOwners(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/data/owners`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Check owner of token
     * <p><b>1 credit per API call</b></p>
     * <p>Check if wallet address owns any specified token (ERC-20, ERC-721 or ERC-1155) on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name, wallet address and address of any fungible token, NFT or multitoken collection. Our API will return <code>true</code> if provided wallet address owns them.</li>
     * <li>If wallet address does not own the specific token, response body is <code>false</code> and status code is <code>200</code>.</li>
     * <li>It is also possible to check if wallet address owns a specific NFT by specifying a <code>tokenId</code>.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param address The blockchain address of the wallet.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @returns boolean OK
     * @throws ApiError
     */
    public static checkOwnerV4(
        chain: ChainEnum,
        address: string,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
    ): CancelablePromise<boolean> {
        return __request({
            method: 'GET',
            path: `/v4/data/owners/address`,
            query: {
                'chain': chain,
                'address': address,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Check owner of token
     * <p><b>1 credit per API call</b></p>
     * <p>Check if wallet address owns any specified token (ERC-20, ERC-721 or ERC-1155) on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name, wallet address and address of any fungible token, NFT or multitoken collection. Our API will return <code>true</code> if provided wallet address owns them.</li>
     * <li>If wallet address does not own the specific token, response body is <code>false</code> and status code is <code>200</code>.</li>
     * <li>It is also possible to check if wallet address owns a specific NFT by specifying a <code>tokenId</code>.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param address The blockchain address of the wallet.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @returns boolean OK
     * @throws ApiError
     */
    public static checkOwner(
        chain: ChainEnum,
        address: string,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
    ): CancelablePromise<boolean> {
        return __request({
            method: 'GET',
            path: `/v3/data/owners/address`,
            query: {
                'chain': chain,
                'address': address,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}