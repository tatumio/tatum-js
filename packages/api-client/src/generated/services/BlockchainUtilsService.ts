/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainUtilsService {

    /**
     * Get contract address from transaction
     * <h4>1 credit per API call.</h4><br/><p>Get smart contract address from deploy transaction.</p>
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @returns any OK
     * @throws ApiError
     */
    public static scGetContractAddress(
        chain: 'ETH' | 'ONE' | 'CELO' | 'TRON' | 'MATIC' | 'BSC',
        hash: string,
    ): CancelablePromise<{
        /**
         * Address of the smart contract.
         */
        contractAddress?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/sc/address/${chain}/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Estimate block height based on time
     * <h4>1 credits per API call.</h4><br/>
     * <p>Get estimated block height at given time. This is estimation, not an exact block height.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * </p>
     *
     * @param chain Blockchain to work with
     * @param date Date and time in ISO 8601 string
     * @returns number OK
     * @throws ApiError
     */
    public static getAuctionEstimatedTime(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        date: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/auction/time/${chain}/${date}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}