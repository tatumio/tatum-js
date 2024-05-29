/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockItem } from '../models/BlockItem';
import type { BlockNumber } from '../models/BlockNumber';
import type { BlockNumberTo } from '../models/BlockNumberTo';
import type { ChainEnum } from '../models/ChainEnum';
import type { Event } from '../models/Event';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DeFiApiService {

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
    public static getEventsV4(
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
            path: `/v4/data/events`,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
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
    public static getBlocksV4(
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
            path: `/v4/data/blocks`,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
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
    public static getLatestBlockV4(
        chain: ChainEnum,
    ): CancelablePromise<BlockItem> {
        return __request({
            method: 'GET',
            path: `/v4/data/blocks/latest`,
            query: {
                'chain': chain,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}