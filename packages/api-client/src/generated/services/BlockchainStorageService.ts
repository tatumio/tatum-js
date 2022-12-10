/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRecord } from '../models/CreateRecord';
import type { CreateRecordCelo } from '../models/CreateRecordCelo';
import type { TransactionHash } from '../models/TransactionHash';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainStorageService {

    /**
     * Store log record
     * <p><b>2 credits per API call + additional credits based on the size of the stored data and the type of the blockchain</b></p>
     * <p>Store data on the blockchain.</p>
     * <p>The total cost of a transaction on Ethereum (in credits) depends on the size of the data. The data is stored as a string in the hexadecimal format, and the maximum size of the data is approximately 130 kB on the mainnet and 30 kB on testnet. Every 5 characters cost 1 credit.<br/>
     * Therefore, one API call with 1 kB of data (1024 characters) would cost 205 credits.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Elrond</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static storeLog(
        requestBody: (CreateRecord | CreateRecordCelo),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/record`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get log record
     * <h4>1 credit per API call.</h4><br/><p>Gets log data from the Ethereum blockchain.</p>
     * @param chain The blockchain to get the log record from
     * @param id ID of the log record / transaction on the blockchain
     * @returns any OK
     * @throws ApiError
     */
    public static getLog(
        chain: 'ETH',
        id: string,
    ): CancelablePromise<{
        /**
         * Data stored in the record.
         */
        data: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/record`,
            query: {
                'chain': chain,
                'id': id,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}