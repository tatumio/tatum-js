/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Consumption } from '../models/Consumption';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ServiceUtilsService {

    /**
     * Get information about your credit consumption for the last month
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about your credit consumption for the last month (used credits per day).</p>
     *
     * @returns Consumption OK
     * @throws ApiError
     */
    public static getCredits(): CancelablePromise<Array<Consumption>> {
        return __request({
            method: 'GET',
            path: `/v3/tatum/usage`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get API version
     * <h4>1 credit per API call.</h4><br/><p>Get current version of the API.</p>
     * @returns any OK
     * @throws ApiError
     */
    public static getVersion(): CancelablePromise<{
        version?: string;
        testnet?: boolean;
        planName?: string;
        planCode?: string;
        price?: number;
        expiration?: number;
        creditLimit?: number;
        usage?: number;
        rolloverDay?: number;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tatum/version`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Freeze API Key
     * <h4>2 credits per API call.</h4><br/><p>Freeze the API Key.
     * It's not possible to perform sensitive operations like send ledger transaction, send off-chain transaction, send blockchain transaction,
     * broadcast blockchain transaction, perform Order book trade or create blockage. Only read operations are permitted.</p>
     *
     * @returns void
     * @throws ApiError
     */
    public static freezeApiKey(): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/tatum/freeze`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Unfreeze API Key
     * <h4>2 credits per API call.</h4><br/><p>Unfreeze the API Key.
     * It's possible to perform sensitive operations like send ledger transaction, send off-chain transaction, send blockchain transaction,
     * broadcast blockchain transaction, perform Order book trade or create blockage again.</p>
     *
     * @returns void
     * @throws ApiError
     */
    public static unfreezeApiKey(): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/tatum/freeze`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
