/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class MaliciousAddressService {

    /**
     * Check malicous address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Check, if the blockchain address is malicous. Malicous address can contain assets from the DarkWeb, is connected to the scam projects or contains stolen funds.</p><br/>
     * <p>Supported Chains: ETH, BTC, LTC</p>
     *
     * @param address Blockchain Address to check
     * @returns any OK
     * @throws ApiError
     */
    public static checkMalicousAddress(
        address: string,
    ): CancelablePromise<{
        /**
         * Whether address is malicous or not
         */
        status?: 'valid' | 'invalid';
    }> {
        return __request({
            method: 'GET',
            path: `/v3/security/address/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
