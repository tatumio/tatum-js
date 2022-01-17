/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuorumBlock } from '../models/QuorumBlock';
import type { QuorumTx } from '../models/QuorumTx';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferQuorum } from '../models/TransferQuorum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainQuorumService {

    /**
     * Generate Quorum Account
     * <h4>2 credit per API call.</h4><br/>
     * <p>Generate address account. Account must be protected with the password. To start using account, it must be unlocked via <a href="#operation/QuorumUnlockAccount" target="_blank">Unlock Quorum Account method</a>.</p>
     *
     * @param xQuorumEndpoint URL of the Quorum network
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static quorumGenerateAccount(
        xQuorumEndpoint: string,
        requestBody: {
            /**
             * Password to protect new account.
             */
            password: string;
        },
    ): CancelablePromise<{
        /**
         * Address of the account.
         */
        address: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/quorum/account`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
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
     * Unlock Quorum Account
     * <h4>2 credit per API call.</h4><br/>
     * <p>Unlock account.</p>
     *
     * @param xQuorumEndpoint URL of the Quorum network
     * @param address Account address
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static quorumUnlockAccount(
        xQuorumEndpoint: string,
        address: string,
        requestBody: {
            /**
             * Password to protect new account.
             */
            password: string;
        },
    ): CancelablePromise<{
        /**
         * Status flag of the operation.
         */
        success?: boolean;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/quorum/account/${address}/unlock`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
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
     * Web3 HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Quorum node.
     * To learn more about Quorum Web3, please visit <a href="https://ethereum.org/en/developers/" target="_blank">Ethereum developer's guide.</a></p>
     *
     * @param xQuorumEndpoint URL of the Quorum network
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static quorumWeb3Driver(
        xQuorumEndpoint: string,
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/quorum/web3/${xApiKey}`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get current block number
     * <h4>1 credit per API call.</h4><br/><p>Get Quorum current block number. This is the number of the latest block in the blockchain.</p>
     * @param xQuorumEndpoint URL of the Quorum network
     * @returns number OK
     * @throws ApiError
     */
    public static quorumGetCurrentBlock(
        xQuorumEndpoint: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/quorum/block/current`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Quorum block by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Quorum block by block hash or block number.</p>
     * @param xQuorumEndpoint URL of the Quorum network
     * @param hash Block hash or block number
     * @returns QuorumBlock OK
     * @throws ApiError
     */
    public static quorumGetBlock(
        xQuorumEndpoint: string,
        hash: string,
    ): CancelablePromise<QuorumBlock> {
        return __request({
            method: 'GET',
            path: `/v3/quorum/block/${hash}`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Quorum Transaction
     * <h4>1 credit per API call.</h4><br/><p>Get Quorum transaction by transaction hash.</p>
     * @param xQuorumEndpoint URL of the Quorum network
     * @param hash Transaction hash
     * @returns QuorumTx OK
     * @throws ApiError
     */
    public static quorumGetTransaction(
        xQuorumEndpoint: string,
        hash: string,
    ): CancelablePromise<QuorumTx> {
        return __request({
            method: 'GET',
            path: `/v3/quorum/transaction/${hash}`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Quorum transaction receipt
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Quorum Transaction Receipt by transaction hash. Transaction receipt is available only after transaction is included in the block and contains information about paid fee or created contract address and much more.</p>
     *
     * @param xQuorumEndpoint URL of the Quorum network
     * @param hash Transaction hash
     * @returns QuorumTx OK
     * @throws ApiError
     */
    public static quorumGetTransactionReceipt(
        xQuorumEndpoint: string,
        hash: string,
    ): CancelablePromise<QuorumTx> {
        return __request({
            method: 'GET',
            path: `/v3/quorum/transaction/${hash}/receipt`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Quorum transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Quorum transaction account to account.<br/><br/>
     * This operation can be used to send native assets between two accounts or to store data into the blockchain.</p>
     *
     * @param xQuorumEndpoint URL of the Quorum network
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static quorumBlockchainTransfer(
        xQuorumEndpoint: string,
        requestBody: TransferQuorum,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/quorum/transaction`,
            headers: {
                'x-quorum-endpoint': xQuorumEndpoint,
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

}