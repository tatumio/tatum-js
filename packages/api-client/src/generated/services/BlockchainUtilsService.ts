/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainUtilsService {

    /**
     * Get the blockchain address of a smart contract by the deployment transaction ID
     * <p><b>1 credit per API call</b></p>
     * <p>Get the blockchain address of a smart contract by the ID of its deployment transaction.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Elrond</li>
     * <li>Ethereum</li>
     * <li>Flow</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>TRON</li>
     * <li>XinFin</li>
     * </ul>
     *
     * @param chain The blockchain to work with
     * @param hash The ID (hash) of the deployment transaction
     * @returns any OK
     * @throws ApiError
     */
    public static scGetContractAddress(
        chain: 'ALGO' | 'BSC' | 'CELO' | 'EGLD' | 'ETH' | 'FLOW' | 'KLAY' | 'KCS' | 'MATIC' | 'ONE' | 'TRON' | 'XDC',
        hash: string,
    ): CancelablePromise<{
        /**
         * The blockchain address of the smart contract
         */
        contractAddress?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/sc/address/${chain}/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Estimate the block height for a future point in time
     * <p><b>1 credit per API call</b></p>
     * <p>Get an estimated block height (number) for some future point in time.</p>
     * <p>Note that this API returnes an <b>estimation</b> of what the block height might be and <b>not</b> the exact block height.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain The blockchain to work with
     * @param date The date and time in the ISO 8601 standard format
     * @returns number OK
     * @throws ApiError
     */
    public static getAuctionEstimatedTime(
        chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE',
        date: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/auction/time/${chain}/${date}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}