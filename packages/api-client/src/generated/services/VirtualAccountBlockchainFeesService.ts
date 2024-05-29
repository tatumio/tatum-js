/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeeBtcBased } from '../models/FeeBtcBased';
import type { OffchainEstimateFee } from '../models/OffchainEstimateFee';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class VirtualAccountBlockchainFeesService {

    /**
     * Estimate ledger to blockchain transaction fee
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate current transaction fee for ledger to blockchain transaction.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Bitcoin</li>
     * <li>Litecoin</li>
     * <li>Dogecoin</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns FeeBtcBased OK
     * @throws ApiError
     */
    public static offchainEstimateFee(
        requestBody: OffchainEstimateFee,
    ): CancelablePromise<FeeBtcBased> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/blockchain/estimate`,
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