/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PendingTransaction } from '../models/PendingTransaction';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SecurityKeyManagementSystemService {

    /**
     * Get pending transactions to sign
     * <h4>1 credit per API call.</h4><br/><p>Get list of pending transaction to be signed and broadcast using Tatum KMS.</p>
     * @param chain Blockchain to get pending transactions for.
     * @param signatures Signature IDs of the KMS which invokes this endpoint. If multiple, they should be separated by comma.
     * @returns PendingTransaction OK
     * @throws ApiError
     */
    public static getPendingTransactionsToSign(
        chain: 'BNB' | 'BTC' | 'ETH' | 'XLM' | 'XRP' | 'BCH' | 'LTC' | 'DOGE' | 'VET' | 'BSC' | 'ADA' | 'MATIC' | 'CELO' | 'FLOW' | 'TRON' | 'ONE' | 'XDC' | 'EGLD',
        signatures?: string,
    ): CancelablePromise<PendingTransaction> {
        return __request({
            method: 'GET',
            path: `/v3/kms/pending/${chain}`,
            query: {
                'signatures': signatures,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}