/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainFabricService {

    /**
     * Store data
     * <h4>2 credit per API call.</h4><br/>
     * <p>Store data on the Hyperledger under the key.</p>
     *
     * @param xFabricEndpoint URL of the Fabric network
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static fabricGenerateAccount(
        xFabricEndpoint: string,
        requestBody: {
            /**
             * Key, under which the data will be stored.
             */
            key: string;
            /**
             * Data, which will be stored under the key.
             */
            data: string;
            /**
             * Chain to store data on.
             */
            chain: 'FABRIC';
        },
    ): CancelablePromise<{
        /**
         * Key, under which the data was stored.
         */
        txId: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/fabric/data`,
            headers: {
                'x-fabric-endpoint': xFabricEndpoint,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Gat data
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get data from Fabroc</p>
     *
     * @param xFabricEndpoint URL of the Fabric network
     * @param key Key to obtain data.
     * @returns any OK
     * @throws ApiError
     */
    public static fabricGetData(
        xFabricEndpoint: string,
        key: string,
    ): CancelablePromise<{
        /**
         * Stored data.
         */
        data: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/fabric/data/${key}`,
            headers: {
                'x-fabric-endpoint': xFabricEndpoint,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}