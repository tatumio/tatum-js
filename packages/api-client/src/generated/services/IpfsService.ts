/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class IpfsService {

    /**
     * Get file from IPFS
     * <h4>1 credit per API call.</h4><br/><p>Gets data from the IPFS.</p>
     * @param id IPFS CID of the file
     * @returns binary OK
     * @throws ApiError
     */
    public static getIpfsData(
        id: string,
    ): CancelablePromise<Blob> {
        return __request({
            method: 'GET',
            path: `/v3/ipfs/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Store data to IPFS
     * <h4>2 credits per API call. Only files up to 50MB are available for storing.</h4><br/>
     * <p>Stores file on the IPFS. We are leveraging <a href="https://web3.storage/" target="_blank">web3.storage</a> from <a href="https://protocol.ai/" target="_blank">Protocol Labs</a> for free storage on the IPFS.</p>
     *
     * @param formData
     * @returns any OK
     * @throws ApiError
     */
    public static storeIpfs(
        formData: {
            /**
             * Your file to store
             */
            file?: Blob;
        },
    ): CancelablePromise<{
        /**
         * IPFS CID identifier of the stored file.
         */
        ipfsHash?: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/ipfs`,
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
