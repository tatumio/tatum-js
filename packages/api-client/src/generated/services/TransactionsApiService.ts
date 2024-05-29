/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockNumber } from '../models/BlockNumber';
import type { BlockNumberTo } from '../models/BlockNumberTo';
import type { ChainEnumExtended } from '../models/ChainEnumExtended';
import type { Cursor } from '../models/Cursor';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { TokenAddress } from '../models/TokenAddress';
import type { TokenId } from '../models/TokenId';
import type { TxData } from '../models/TxData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class TransactionsApiService {

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
    public static getTransactionsV4(
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
            path: `/v4/data/transactions`,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
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
    public static getTransactionsByHashV4(
        chain: ChainEnumExtended,
        hash: string,
    ): CancelablePromise<Array<TxData>> {
        return __request({
            method: 'GET',
            path: `/v4/data/transactions/hash`,
            query: {
                'chain': chain,
                'hash': hash,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}