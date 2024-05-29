/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRecord } from '../models/CreateRecord';
import type { CreateRecordCelo } from '../models/CreateRecordCelo';
import type { CreateRecordKMS } from '../models/CreateRecordKMS';
import type { TransactionHash } from '../models/TransactionHash';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainStorageService {

    /**
     * Store a log record
     * <p><b>2 credits per API call + additional credits based on the size of the stored data and the type of the blockchain</b></p>
     * <p>Store data on the blockchain.</p>
     * <p>The total cost of a transaction on Ethereum (in credits) depends on the size of the data. The data is stored as a string in the hexadecimal format, and the maximum size of the data is approximately 130 kB on the mainnet and 30 kB on testnet. Every 5 characters cost 1 credit.<br/>
     * Therefore, one API call with 1 kB of data (1024 characters) would cost 205 credits.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Elrond</li>
     * <li>Ethereum (only the mainnet or the Sepolia testnet)</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>XDC</li>
     * </ul>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static storeLog(
        requestBody: (CreateRecord | CreateRecordKMS | CreateRecordCelo),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/record`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get a log record
     * <p><b>1 credit per API call</b></p>
     * <p>Get a log data record from the Ethereum blockchain (only the mainnet or the Sepolia testnet).</p>
     *
     * @param chain The blockchain to get the log record from
     * @param id The ID of the log record or transaction to get from the blockchain
     * @returns any OK
     * @throws ApiError
     */
    public static getLog(
        chain: 'ETH',
        id: string,
    ): CancelablePromise<{
        /**
         * The data stored in the requested record
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}