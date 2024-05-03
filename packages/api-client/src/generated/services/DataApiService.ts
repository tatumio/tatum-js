/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceItem } from '../models/BalanceItem';
import type { BlockItem } from '../models/BlockItem';
import type { BlockNumber } from '../models/BlockNumber';
import type { BlockNumberTo } from '../models/BlockNumberTo';
import type { Chain } from '../models/Chain';
import type { ChainEnum } from '../models/ChainEnum';
import type { ChainEnumExtended } from '../models/ChainEnumExtended';
import type { ChainUtxoEnum } from '../models/ChainUtxoEnum';
import type { Cursor } from '../models/Cursor';
import type { Event } from '../models/Event';
import type { ExcludeMetadata } from '../models/ExcludeMetadata';
import type { FungibleInfo } from '../models/FungibleInfo';
import type { FungibleInfoTezos } from '../models/FungibleInfoTezos';
import type { MultitokenInfo } from '../models/MultitokenInfo';
import type { NftInfo } from '../models/NftInfo';
import type { NftInfoTezos } from '../models/NftInfoTezos';
import type { NftMetadata } from '../models/NftMetadata';
import type { NftMetadataURI } from '../models/NftMetadataURI';
import type { NftTokenInfo } from '../models/NftTokenInfo';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { Token } from '../models/Token';
import type { TokenAddress } from '../models/TokenAddress';
import type { TokenId } from '../models/TokenId';
import type { TokenIds } from '../models/TokenIds';
import type { TokenTezos } from '../models/TokenTezos';
import type { TokenType } from '../models/TokenType';
import type { TxData } from '../models/TxData';
import type { Utxo } from '../models/Utxo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DataApiService {

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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
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
     * <li>Polygon - polygon / polygon-amoy</li>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get balances of addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon / polygon-amoy</li>
     * <li>Tezos - tezos-mainnet</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and comma-separated list of addresses. Our API will return balances of each token along with further information such as its type, id, and more.</li>
     * <li>Aside from relevant information about each token and its balance, the response also contains metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to <code>true</code>).</li>
     * <li>If not specified, the API returns balances for all supported types of tokens (fungible tokens, nft, multitokens), but you can also choose to filter specific <code>tokenTypes</code>.</li>
     * <li>For Tezos blockchain, the API returns balance of any tokens including native token (XTZ) for specified wallet addresses. Following query parameters won't have any effect on filtering data <code>excludeMetadata</code>.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param addresses The blockchain public wallet addresses.
     * It is possible to enter list of up to 10 addresses as a comma separated string.
     *
     * @param tokenTypes The option to select only specific token types.
     * It is possible to enter list of multiple types as a comma separated string.
     * Use fungible (ERC-20), nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
     *
     * @param excludeMetadata The option to exclude metadata from the response.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns any OK
     * @throws ApiError
     */
    public static getBalances(
        chain: ChainEnumExtended,
        addresses: string,
        tokenTypes?: 'nft' | 'multitoken' | 'fungible',
        excludeMetadata?: ExcludeMetadata,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<{
        /**
         * List of all balances for all selected tokens.
         */
        result?: Array<BalanceItem>;
        /**
         * Cursor pagination, used to get previous page of results (work in progress, not used right now).
         */
        prevPage?: string;
        /**
         * Cursor pagination, used to get next page of results (work in progress, not used right now).
         */
        nextPage?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/data/balances`,
            query: {
                'chain': chain,
                'addresses': addresses,
                'tokenTypes': tokenTypes,
                'excludeMetadata': excludeMetadata,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
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
     * <li>Polygon - polygon / polygon-amoy</li>
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
     * @returns any[] OK
     * @throws ApiError
     */
    public static getOwners(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<any[]> {
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get transactions
     * <p><b>20 credits per API call</b></p>
     * <p>Get transactions on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Tezos - tezos-mainnet</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and comma-separated list of addresses. Our API will return all of their transactions along with further information such as their block number, ID of involved token, and more.</li>
     * <li>If not specified, the API returns transactions of various types (fungible, nft, multitoken, native), but you can also choose to filter specific <code>transactionTypes</code> and even <code>transactionSubtype</code> (incoming, outgoing, zero-transfer).</li>
     * <li>On top of that, you can add further filters such as specifying block range where the transactions should have occurred, or address and ID of involved tokens.</li>
     * <li>For Tezos blockchain, the API accepts only one wallet address in <code>addresses</code> query parameter. Following query parameters won't have any effect on filtering data: <code>transactionTypes</code>, <code>transactionSubtype</code>, <code>tokenId</code>, <code>blockTo</code>.</li>
     * <li>When querying Tezos transactions for a specified wallet or contract address, pagination is supported via <code>pageSize</code> and <code>offset</code> query parameters.
     * <li>When querying Tezos transactions for a specified block, pagination is supported via <code>cursor</code> query parameter, by filling in the value from <code>prevPage</code> or <code>nextPage</code> field in the response body.</li>
     * <li><b>When you are filtering data using blockFrom and not using blockTo, blockTo is automatically added as blockFrom + 1000. The same applies when blockTo is present and blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</b></li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param addresses The blockchain public wallet addresses.
     * It is possible to enter list of up to 10 addresses as a comma separated string.
     *
     * @param transactionTypes The option to filter transaction based on types.
     * It is possible to enter list of multiple types as a comma separated string.
     * Use fungible (ERC-20), nft (ERC-721 and ERC-1155), multitoken (ERC-1155) or native.
     *
     * @param transactionSubtype The option to filter transaction based on subtype.
     * @param tokenAddress Address of a token (smart contract).
     * @param tokenId ID of a token.
     * @param blockFrom Transactions from this block onwards will be included. If blockTo is not specified, it is automatically calculated as blockFrom + 1000.
     * @param blockTo Transactions up to this block will be included. If blockFrom is not specified, it is automatically calculated as blockTo - 1000.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @param cursor The cursor to obtain previous page or next page of the data. Available only for Tezos blockchain.
     * @returns any OK
     * @throws ApiError
     */
    public static getTransactions(
        chain: ChainEnumExtended,
        addresses?: string,
        transactionTypes?: 'fungible' | 'nft' | 'multitoken' | 'native',
        transactionSubtype?: 'incoming' | 'outgoing' | 'zero-transfer',
        tokenAddress?: TokenAddress,
        tokenId?: TokenId,
        blockFrom?: BlockNumber,
        blockTo?: BlockNumberTo,
        pageSize?: PageSize,
        offset?: Offset,
        cursor?: Cursor,
    ): CancelablePromise<{
        /**
         * List of all selected transactions.
         */
        result?: Array<TxData>;
        /**
         * Cursor pagination, used to get previous page of results (only relevant for Tezos).
         */
        prevPage?: string;
        /**
         * Cursor pagination, used to get next page of results (only relevant for Tezos).
         */
        nextPage?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/data/transactions`,
            query: {
                'chain': chain,
                'addresses': addresses,
                'transactionTypes': transactionTypes,
                'transactionSubtype': transactionSubtype,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
                'blockFrom': blockFrom,
                'blockTo': blockTo,
                'pageSize': pageSize,
                'offset': offset,
                'cursor': cursor,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get transactions by hash
     * <p><b>5 credits per API call</b></p>
     * <p>Get transactions by hash on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Tezos - tezos-mainnet</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain name and transaction hash, and our API will return a list of transactions with that hash.</li>
     * <li>The response will contain all the relevant information about specified transactions such as their block number, IDs of involved token, and more.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param hash Hash of the transaction.
     * @returns TxData OK
     * @throws ApiError
     */
    public static getTransactionsByHash(
        chain: ChainEnumExtended,
        hash: string,
    ): CancelablePromise<Array<TxData>> {
        return __request({
            method: 'GET',
            path: `/v3/data/transactions/hash`,
            query: {
                'chain': chain,
                'hash': hash,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get specified events
     * <p><b>20 credits per API call</b></p>
     * <p>Get all events on given addresses and / or in the requested block range on the following blockchains:</p>
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
     * <li>To improve response times and obtain specific data, it is recommended to use proper filtering techniques. Please provide a chain name and a combination of filters that will accomplish this (at least block range or contract addresses must be specified).</li>
     * <li>It is possible to specify multiple contract addresses at once by passing them as a comma separated string.</li>
     * <li>If block range is not specified, the API attempts to go through all available blocks, which may result in a timeout error.</li>
     * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is automatically added as blockFrom + 1000. The same applies when blockTo is present and blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
     * <li>It is recommended to filter only one specific type of events, which comes with built-in decoding for all the supported types.</li>
     * <li>It is, however, also possible to filter by signature hashes, which can be passed together as a comma separated string.</li>
     * </ul>
     * <p>As noted above, aside from general info and hashed event data, the API also decodes them for you in case you filter by one of the following supported event types:</p>
     * <ul>
     * <li><code>tokenTransfer</code>: All transfers of fungible tokens (including stablecoins) and NFTs as per ERC-20 and ERC-721 standard.</li>
     * <li><code>multitokenTransfer</code>: All transfers of multitokens (both single transfers and batch transfers) as per ERC-1155 standard.</li>
     * <li><code>stablecoinTransfer</code>: Refers to the transfer of specific stablecoins on the mainnet. Typically, the top 10 to 16 stablecoins on each chain according to CoinMarketCap are included. If the <code>contractAddresses</code> parameter is also used in the filter combination, any tokens specified in it will also be included in the list.</li>
     * <li><code>uniswapTrade</code>: Provides all swap events that occur on both Uniswap V2 and V3. In some cases, it may not be possible to map the swapped amounts to specific tokens. As a result, certain decoded data such as token amounts might be missing or in the original big number format. This will be indicated by the response parameter <code>partiallyRaw: true</code>.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param contractAddresses The blockchain addresses of the contracts where requested events were emitted.
     * It is possible to enter list of up to 10 addresses as a comma separated string.
     *
     * @param blockFrom First block to start from (including this one).
     * @param blockTo Last block to finish on (including this one).
     * @param eventType The type of events that should be returned, which comes with decoded data in the response
     * (cannot be used together with signatures).
     *
     * @param signatures The types of events that should be returned, specified by hashed signature
     * (cannot be used together with eventType).
     * It is possible to enter list of multiple signatures as a comma separated string.
     *
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns Event OK
     * @throws ApiError
     */
    public static getEvents(
        chain: ChainEnum,
        contractAddresses: string,
        blockFrom: BlockNumber,
        blockTo: BlockNumberTo,
        eventType: 'tokenTransfer' | 'multitokenTransfer' | 'stablecoinTransfer' | 'uniswapTrade',
        signatures?: string,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Event> {
        return __request({
            method: 'GET',
            path: `/v3/data/events`,
            query: {
                'chain': chain,
                'contractAddresses': contractAddresses,
                'blockFrom': blockFrom,
                'blockTo': blockTo,
                'eventType': eventType,
                'signatures': signatures,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get specified blocks
     * <p><b>10 credits per API call</b></p>
     * <p>Get information about blocks (when they were added, how many NFTs and events were ingested and list of transaction hashes that were processed within them) on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started, provide a chain and specify one of the filters listed below (combination of these filters is not allowed):</p>
     * <ul>
     * <li>List of block numbers separated by comma</li>
     * <li>Range of block numbers</li>
     * <li>Date range when blocks were processed</li>
     * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is automatically added as blockFrom + 1000. The same applies when blockTo is present and blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param blockIds List of block numbers, separated by comma.
     * @param blockFrom Range of block numbers. Both blockFrom and blockTo need to be specified.
     * @param blockTo Range of block numbers. Both blockFrom and blockTo need to be specified.
     * @param timeFrom Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
     * @param timeTo Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
     * @param pageSize The number of items per page (default is 50).
     * @param offset The offset to obtain next page of the data.
     * @returns BlockItem OK
     * @throws ApiError
     */
    public static getBlocks(
        chain: ChainEnum,
        blockIds?: Array<number>,
        blockFrom?: BlockNumber,
        blockTo?: BlockNumber,
        timeFrom?: string,
        timeTo?: string,
        pageSize?: PageSize,
        offset?: Offset,
    ): CancelablePromise<Array<BlockItem>> {
        return __request({
            method: 'GET',
            path: `/v3/data/blocks`,
            query: {
                'chain': chain,
                'blockIds': blockIds,
                'blockFrom': blockFrom,
                'blockTo': blockTo,
                'timeFrom': timeFrom,
                'timeTo': timeTo,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get latest block
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about latest added block on the following blockchains:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * </ul>
     * <p>To get started, you can just provide a chain.</p>
     *
     * @param chain The blockchain to work with.
     * @returns BlockItem OK
     * @throws ApiError
     */
    public static getLatestBlock(
        chain: ChainEnum,
    ): CancelablePromise<BlockItem> {
        return __request({
            method: 'GET',
            path: `/v3/data/blocks/latest`,
            query: {
                'chain': chain,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get information about collection or token
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about your favorite token! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * <li>Tezos - tezos-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain and address of any fungible token, NFT or multitoken collection. If available, our API will return information about them such as their name, symbol, supply, and more.</li>
     * <li>You can also get extra infomation (such as metadata) of a specific NFT or multitoken by passing <code>tokenId</code> as a query parameter.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @returns any OK
     * @throws ApiError
     */
    public static getTokens(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
    ): CancelablePromise<(FungibleInfo | NftInfo | MultitokenInfo | NftTokenInfo | NftInfoTezos | FungibleInfoTezos)> {
        return __request({
            method: 'GET',
            path: `/v3/data/tokens`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                404: `Collection or token not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get unspent UTXOs for an address
     * <p><b>100 credits per API call</b></p>
     * <p>Get unspent UTXOs for a specific address up to a specific total amount.
     * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue``` as a total, our API will return a list of UTXOs that will be enough to cover the transaction.</p>
     * Our API lets you get the unpenst UTXOs for a specific address on:</p>
     * <ul>
     * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
     * <li>Litecoin - litecoin / litecoin-testnet</li>
     * <li>Dogecoin - doge / doge-testnet</li>
     * <li>Cardano - cardano / cardano-preprod</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain and address you want to list unspent UTXOs for. If available, our API will return information about the unspent UTXOs for a specific address. API traverses latest 200k incoming transactions.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param address The blockchain address.
     * @param totalValue The total amount of transaction you want to send. Only UTXOs up to this amount will be returned, so you will not spend more than you need.
     * @returns Utxo OK
     * @throws ApiError
     */
    public static getUtxosByAddress(
        chain: ChainUtxoEnum,
        address: string,
        totalValue: number,
    ): CancelablePromise<Array<Utxo>> {
        return __request({
            method: 'GET',
            path: `/v3/data/utxos`,
            query: {
                'chain': chain,
                'address': address,
                'totalValue': totalValue,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get unspent UTXOs for a batch of addresses
     * <p><b>100 credits per address for each API call.</b></p>
     * <p>Retrieve unspent UTXOs for each provided address, up to a specified total amount.
     * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue``` as a total, our API will return a list of UTXOs that will be enough to cover the transaction.</p>
     * Our API lets you get the unpenst UTXOs for a specific address on:</p>
     * <ul>
     * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
     * <li>Litecoin - litecoin / litecoin-testnet</li>
     * <li>Dogecoin - doge / doge-testnet</li>
     * <li>Cardano - cardano / cardano-preprod</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain and addresses you want to list unspent UTXOs for. If available, our API will return information about the unspent UTXOs for each address. API traverses latest 200k incoming transactions.</li>
     * </ul>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static getUtxosByAddressBatch(
        requestBody: {
            chain?: ChainUtxoEnum;
            /**
             * Addresses
             */
            addresses: Array<string>;
            /**
             * The total amount of transaction you want to send. Only UTXOs up to this amount will be returned, so you will not spend more than you need.
             */
            totalValue: number;
        },
    ): CancelablePromise<Array<{
        /**
         * The blockchain address.
         */
        address?: string;
        /**
         * UTXOs up to amount for address.
         */
        utxos?: Array<Utxo>;
        /**
         * Indicate whether the total value of UTXOs is sufficient for the transaction.
         */
        transactionPossible?: boolean;
    }>> {
        return __request({
            method: 'POST',
            path: `/v3/data/utxos/batch`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}

