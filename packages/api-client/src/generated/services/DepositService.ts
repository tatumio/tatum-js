/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Deposit } from '../models/Deposit';
import type { EntitiesCount } from '../models/EntitiesCount';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DepositService {

    /**
     * List all deposits for product
     * <h4>1 credit per API call.</h4><br/><p>Lists all deposits for API key.</p>
     * @param pageSize Max number of items per page is 50.
     * @param page Page number
     * @param sort Direction of sorting. Can be asc or desc
     * @param status Status of the deposit
     * @param currency Filter by currency
     * @param txId Filter by txId
     * @param to Filter by to address
     * @param accountId Filter by account id
     * @returns Deposit OK
     * @throws ApiError
     */
    public static getDeposits(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        status?: 'Done' | 'InProgress',
        currency?: string,
        txId?: string,
        to?: string,
        accountId?: string,
    ): CancelablePromise<Array<Deposit>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/deposits`,
            query: {
                'pageSize': pageSize,
                'page': page,
                'sort': sort,
                'status': status,
                'currency': currency,
                'txId': txId,
                'to': to,
                'accountId': accountId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Count of found entities for get deposits request
     * <h4>1 credit per API call.</h4><br/><p>Counts total entities found by get deposits request.</p>
     * @param pageSize Max number of items per page is 50.
     * @param page Page number
     * @param sort Direction of sorting. Can be asc or desc
     * @param status Type of the deposit
     * @param currency Filter by currency
     * @param txId Filter by txId
     * @param to Filter by to address
     * @param accountId Filter by account id
     * @returns EntitiesCount OK
     * @throws ApiError
     */
    public static getDepositsCount(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        status?: 'Done' | 'InProgress',
        currency?: string,
        txId?: string,
        to?: string,
        accountId?: string,
    ): CancelablePromise<EntitiesCount> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/deposits/count`,
            query: {
                'pageSize': pageSize,
                'page': page,
                'sort': sort,
                'status': status,
                'currency': currency,
                'txId': txId,
                'to': to,
                'accountId': accountId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
