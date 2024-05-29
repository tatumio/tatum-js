/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceItem } from '../models/BalanceItem';
import type { ChainEnumExtended } from '../models/ChainEnumExtended';
import type { ChainUtxoEnum } from '../models/ChainUtxoEnum';
import type { ExcludeMetadata } from '../models/ExcludeMetadata';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { Utxo } from '../models/Utxo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class WalletApiService {

    /**
     * Get balances of addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
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
    public static getBalancesV4(
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
            path: `/v4/data/balances`,
            query: {
                'chain': chain,
                'addresses': addresses,
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
     * Get balances of addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
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
    public static getUtxosByAddressV4(
        chain: ChainUtxoEnum,
        address: string,
        totalValue: number,
    ): CancelablePromise<Array<Utxo>> {
        return __request({
            method: 'GET',
            path: `/v4/data/utxos`,
            query: {
                'chain': chain,
                'address': address,
                'totalValue': totalValue,
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
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
    public static getUtxosByAddressBatchV4(
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
            path: `/v4/data/utxos/batch`,
            body: requestBody,
            mediaType: 'application/json',
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}