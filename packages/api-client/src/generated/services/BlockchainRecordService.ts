/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRecord } from '../models/CreateRecord';
import type { CreateRecordCelo } from '../models/CreateRecordCelo';
import type { CreateRecordFabric } from '../models/CreateRecordFabric';
import type { CreateRecordQuorum } from '../models/CreateRecordQuorum';
import type { TransactionHash } from '../models/TransactionHash';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainRecordService {

    /**
     * Store log record
     * <h4>2 credits per API call. Additional credits are debited based on the size of the stored data and the type of blockchain.</h4><br/>
     * <p>Stores record data on blockchain. Tatum currently supports the Ethereum, CELO, MATIC, ONE, XDC, Quorum, BSC, EGLD and Hyperledger Fabric blockchain and Quorum to store data.<br/>
     * The total cost of the transaction (in credits) on the Ethereum blockchain is dependent on the size of the data. Data are stored as a HEX string and the maximum data size is approximatelly 130 kB on mainnet, 30 kB on testnet.<br/>
     * Every 5 characters of data costs 1 credit, so an API call with a data of length 1 kB = 1024 characters and would cost 205 credits.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static storeLog(
        requestBody: (CreateRecord | CreateRecordCelo | CreateRecordQuorum | CreateRecordFabric),
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