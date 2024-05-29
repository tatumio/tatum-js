/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KmsSignatureIds } from '../models/KmsSignatureIds';
import type { PendingTransaction } from '../models/PendingTransaction';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class KeyManagementSystemService {

    /**
     * Get pending transactions to sign
     * <p><b>1 credit per API call</b></p>
     * <p>Get the list of pending transactions to sign and broadcast using <a href="https://github.com/tatumio/tatum-kms" target="_blank">KMS</a>.</p>
     *
     * @param chain Blockchain to get pending transactions for.
     * @param signatures Signature IDs of the KMS which invokes this endpoint. If multiple, they should be separated by comma.
     * @returns PendingTransaction OK
     * @throws ApiError
     */
    public static getPendingTransactionsToSign(
        chain: 'ADA' | 'BNB' | 'BTC' | 'ETH' | 'XLM' | 'XRP' | 'BCH' | 'LTC' | 'DOGE' | 'VET' | 'BSC' | 'MATIC' | 'CELO' | 'FLOW' | 'TRON' | 'ONE' | 'XDC' | 'EGLD' | 'KLAY' | 'SOL',
        signatures?: string,
    ): CancelablePromise<Array<PendingTransaction>> {
        return __request({
            method: 'GET',
            path: `/v3/kms/pending/${chain}`,
            query: {
                'signatures': signatures,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get pending transactions to sign
     * <p><b>1 credit for every 500 signature IDs per API call</b></p>
     * <p>Get the list of pending transactions to sign and broadcast using <a href="https://github.com/tatumio/tatum-kms" target="_blank">KMS</a>.</p>
     * <p><b>NOTE:</b> This API works only in KMS v5.0 or later. If you use KMS older than v5.0, use <a href="#operation/GetPendingTransactionsToSign">this API</a> instead.</p>
     *
     * @param chain Blockchain to get pending transactions for.
     * @param requestBody Signature IDs of the KMS which invokes this endpoint.
     * @returns PendingTransaction OK
     * @throws ApiError
     */
    public static receivePendingTransactionsToSign(
        chain: 'ADA' | 'BNB' | 'BTC' | 'ETH' | 'XLM' | 'XRP' | 'BCH' | 'LTC' | 'DOGE' | 'VET' | 'BSC' | 'MATIC' | 'CELO' | 'FLOW' | 'TRON' | 'ONE' | 'XDC' | 'EGLD' | 'KLAY' | 'SOL',
        requestBody?: KmsSignatureIds,
    ): CancelablePromise<Array<PendingTransaction>> {
        return __request({
            method: 'POST',
            path: `/v3/kms/pending/${chain}`,
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

    /**
     * Complete pending transaction to sign
     * <h4>2 credits per API call.</h4><br/>
     * <p>Mark pending transaction to sign as a complete and update it with a transactionID from the blockchain.</p>
     *
     * @param id ID of pending transaction
     * @param txId transaction ID of blockchain transaction
     * @returns void
     * @throws ApiError
     */
    public static completePendingSignature(
        id: string,
        txId: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/kms/${id}/${txId}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get transaction details
     * <h4>1 credit per API call.</h4><br/><p>Get detail of transaction to be signed / that was already signed and contains transactionId.</p>
     * @param id ID of transaction
     * @returns PendingTransaction OK
     * @throws ApiError
     */
    public static getPendingTransactionToSign(
        id: string,
    ): CancelablePromise<PendingTransaction> {
        return __request({
            method: 'GET',
            path: `/v3/kms/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Delete transaction
     * <h4>2 credits per API call.</h4><br/><p>Delete transaction to be signed. When deleting offchain transaction, linked withdrawal will be cancelled automatically.</p>
     * @param id ID of transaction
     * @param revert Defines whether fee should be reverted to account balance as well as amount. Defaults to true. Revert true would be typically used when withdrawal was not broadcast to blockchain. False is used usually for Ethereum ERC20 based currencies.
     * @returns void
     * @throws ApiError
     */
    public static deletePendingTransactionToSign(
        id: string,
        revert: boolean = true,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/kms/${id}`,
            query: {
                'revert': revert,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
