/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchCreateTransaction } from '../models/BatchCreateTransaction';
import type { BatchTransactionResult } from '../models/BatchTransactionResult';
import type { CreateTransaction } from '../models/CreateTransaction';
import type { Transaction } from '../models/Transaction';
import type { TransactionFilter } from '../models/TransactionFilter';
import type { TransactionFilterCustomer } from '../models/TransactionFilterCustomer';
import type { TransactionFilterLedger } from '../models/TransactionFilterLedger';
import type { TransactionResult } from '../models/TransactionResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class TransactionService {

    /**
     * Send payment
     * <h4>4 credits per API call.</h4><br/>
     * <p>Sends a payment within Tatum Private Ledger. All assets are settled instantly.<br/>
     * When a transaction is settled, 2 transaction records are created, 1 for each of the participants. These 2 records are connected via a transaction reference, which is the same for both of them.<br/>
     * This method is only used for transferring assets between accounts within Tatum and will not send any funds to blockchain addresses.<br/>
     * If there is an insufficient balance in the sender account, no transaction is recorded.<br/>
     * It is possible to perform an anonymous transaction where the sender account is not visible for the recipient.<br/>
     * The FIAT currency value of every transaction is calculated automatically. The FIAT value is based on the accountingCurrency of the account connected to the transaction and is available in the marketValue parameter of the transaction.</p>
     *
     * @param requestBody
     * @returns TransactionResult OK
     * @throws ApiError
     */
    public static sendTransaction(
        requestBody: CreateTransaction,
    ): CancelablePromise<TransactionResult> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send payment in batch
     * <h4>2 + 2 * N per API call. (N - count of transactions)</h4><br/>
     * <p>Sends the N payments within Tatum Private Ledger. All assets are settled instantly.<br/>
     * When a transaction is settled, 2 transaction records are created, 1 for each of the participants. These 2 records are connected via a transaction reference, which is the same for both of them.<br/>
     * This method is only used for transferring assets between accounts within Tatum and will not send any funds to blockchain addresses.<br/>
     * If there is an insufficient balance in the sender account, no transaction is recorded.<br/>
     * It is possible to perform an anonymous transaction where the sender account is not visible for the recipient.<br/>
     * The FIAT currency value of every transaction is calculated automatically. The FIAT value is based on the accountingCurrency of the account connected to the transaction and is available in the marketValue parameter of the transaction.</p>
     *
     * @param requestBody
     * @returns BatchTransactionResult OK
     * @throws ApiError
     */
    public static sendTransactionBatch(
        requestBody: BatchCreateTransaction,
    ): CancelablePromise<BatchTransactionResult> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/transaction/batch`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Find transactions for account.
     * <h4>1 credit per API call.</h4><br/><p>Finds transactions for the account identified by the given account ID.</p>
     * @param requestBody
     * @param pageSize Max number of items per page is 50. Either count or pageSize is accepted.
     * @param offset Offset to obtain the next page of data.
     * @param count Get the total transaction count based on the filter. Either count or pageSize is accepted.
     * @returns any OK
     * @throws ApiError
     */
    public static getTransactionsByAccountId(
        requestBody: TransactionFilter,
        pageSize?: number,
        offset?: number,
        count?: boolean,
    ): CancelablePromise<(Array<Transaction> | number)> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/transaction/account`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'count': count,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Find transactions for a customer across all of the customer's accounts.
     * <h4>1 credit per API call.</h4><br/><p>Finds transactions for all accounts of the customer identified by the given internal customer ID.</p>
     * @param requestBody
     * @param pageSize Max number of items per page is 50. Either count or pageSize is accepted.
     * @param offset Offset to obtain the next page of data.
     * @param count Get total transaction count based on the filter. Either count or pageSize is accepted.
     * @returns any OK
     * @throws ApiError
     */
    public static getTransactionsByCustomerId(
        requestBody: TransactionFilterCustomer,
        pageSize?: number,
        offset?: number,
        count?: boolean,
    ): CancelablePromise<(Array<Transaction> | number)> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/transaction/customer`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'count': count,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Find transactions within the ledger.
     * <h4>1 credit per API call.</h4><br/><p>Find transactions across whole ledger.</p>
     * @param requestBody
     * @param pageSize Max number of items per page is 50. Either count or pageSize is accepted.
     * @param offset Offset to obtain the next page of data.
     * @param count Get the total transaction count based on the filter. Either count or pageSize is accepted.
     * @returns any OK
     * @throws ApiError
     */
    public static getTransactions(
        requestBody: TransactionFilterLedger,
        pageSize?: number,
        offset?: number,
        count?: boolean,
    ): CancelablePromise<(Array<Transaction> | number)> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/transaction/ledger`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'count': count,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Find transactions with a given reference across all accounts.
     * <h4>1 credit per API call.</h4><br/><p>Finds transactions for all accounts with the given reference.</p>
     * @param reference
     * @returns Transaction OK
     * @throws ApiError
     */
    public static getTransactionsByReference(
        reference: string,
    ): CancelablePromise<Array<Transaction>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/transaction/reference/${reference}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}