/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastResponse } from '../models/BroadcastResponse';
import type { BroadcastWithdrawal } from '../models/BroadcastWithdrawal';
import type { Withdrawal } from '../models/Withdrawal';
import type { WithdrawalObject } from '../models/WithdrawalObject';
import type { WithdrawalResponse } from '../models/WithdrawalResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class WithdrawalService {

    /**
     * Store withdrawal
     * <h4>2 credits per API call</h4>
     * <p>Create a withdrawal from Tatum Ledger account to the blockchain.</p>
     * <h4>BTC, LTC, DOGE, BCH</h4>
     * <p>
     * When withdrawal from Tatum is executed, all deposits, which are not processed yet are used as an input and
     * change is moved to pool address 0 of wallet for defined account's xpub. If there are no unspent deposits, only last pool address 0 UTXO is used.
     * If balance of wallet is not sufficient, it is impossible to perform withdrawal from this account -> funds were transferred to another
     * linked wallet within system or outside of Tatum visibility.<br/>
     * For the first time of withdrawal from wallet, there must be some deposit made and funds are obtained from that. Since
     * there is no withdrawal, there was no transfer to pool address 0 and thus it is not present in vIn. Pool transfer is identified by missing data.address property in response.
     * When last not cancelled withdrawal is not completed and thus there is no tx id of output transaction given,
     * we cannot perform next withdrawal.
     * </p>
     * <h4>ETH</h4>
     * <p>
     * Withdrawal from Tatum can be processed only from 1 account. In Ethereum Blockchain, each address is recognized as an account and only funds from that account can be sent in 1 transaction.
     * Example: Account A has 0.5 ETH, Account B has 0.3 ETH. Account A is linked to Tatum Account 1, Account B is linked to Tatum Account 2. Tatum Account 1 has balance 0.7 Ethereum and
     * Tatum Account 2 has 0.1 ETH. Withdrawal from Tatum Account 1 can be at most 0.5 ETH, even though balance in Tatum Private Ledger is 0.7 ETH.
     * Because of this Ethereum Blockchain limitation, withdrawal request should always contain sourceAddress, from which withdrawal will be made. To get available balances for Ethereum wallet accounts, use hint endpoint.
     * </p>
     * <h4>XRP</h4>
     * <p>
     * XRP withdrawal can contain DestinationTag except of address, which is placed in attr parameter of withdrawal request.
     * SourceTag of the blockchain transaction should be withdrawal ID for autocomplete purposes of withdrawals.
     * </p>
     * <h4>XLM</h4>
     * <p>
     * XLM withdrawal can contain memo except of address, which is placed in attr parameter of withdrawal request. XLM blockchain does not have possibility to enter source account information.
     * It is possible to create memo in format 'destination|source', which is supported way of memo in Tatum and also there is information about the sender account in the blockchain.
     * </p>
     * <p>
     * When withdrawal is created, all other withdrawals with the same currency are pending, unless the current one is marked as complete or cancelled.</p>
     * <p>Tatum ledger transaction is created for every withdrawal request with operation type WITHDRAWAL. The value of the transaction is the withdrawal amount + blockchain fee, which should be paid.
     * In the situation, when there is withdrawal for ERC20, XLM, or XRP based custom assets, the fee is not included in the transaction because it is paid in different assets than the withdrawal itself.
     * </p>
     *
     * @param requestBody
     * @returns WithdrawalResponse OK
     * @throws ApiError
     */
    public static storeWithdrawal(
        requestBody: Withdrawal,
    ): CancelablePromise<WithdrawalResponse> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/withdrawal`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get withdrawals
     * <h4>1 credit per API call.</h4><br/><p>Get withdrawals.</p>
     * @param pageSize Max number of items per page is 50.
     * @param currency Currency of the withdrawal
     * @param status Status of the withdrawal
     * @param offset Offset to obtain next page of the data.
     * @returns WithdrawalObject OK
     * @throws ApiError
     */
    public static getWithdrawals(
        pageSize: number,
        currency?: string,
        status?: 'InProgress' | 'Done' | 'Cancelled',
        offset?: number,
    ): CancelablePromise<Array<WithdrawalObject>> {
        return __request({
            method: 'GET',
            path: `/v3/offchain/withdrawal`,
            query: {
                'currency': currency,
                'status': status,
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Complete withdrawal
     * <h4>2 credits per API call.</h4><br/>
     * <p>Invoke complete withdrawal as soon as blockchain transaction ID is available. All other withdrawals for the same currency will be pending unless the last one is processed and marked as completed.</p>
     *
     * @param id ID of created withdrawal
     * @param txId Blockchain transaction ID of created withdrawal
     * @returns void
     * @throws ApiError
     */
    public static completeWithdrawal(
        id: string,
        txId: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/offchain/withdrawal/${id}/${txId}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Cancel withdrawal
     * <h4>1 credit per API call.</h4><br/>
     * <p>This method is helpful if you need to cancel the withdrawal if the blockchain transaction fails or is not yet processed.
     * This does not cancel already broadcast blockchain transaction, only Tatum internal withdrawal, and the ledger transaction, that was linked to this withdrawal.<br/>
     * By default, the transaction fee is included in the reverted transaction. There are situations, like sending ERC20 on ETH, TRC token on TRON, XLM or XRP based assets, when the fee should not be reverted, because e.g. the fee is in calculated
     * in Ethereum and transaction was in ERC20 currency. In this situation, only the transaction amount should be reverted, not the fee.
     * </p>
     *
     * @param id ID of created withdrawal
     * @param revert Defines whether fee should be reverted to account balance as well as amount. Defaults to true. Revert true would be typically used when withdrawal was not broadcast to blockchain. False is used usually for Ethereum based currencies when gas was consumed but transaction was reverted.
     * @returns void
     * @throws ApiError
     */
    public static cancelInProgressWithdrawal(
        id: string,
        revert: boolean = true,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/offchain/withdrawal/${id}`,
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

    /**
     * Broadcast signed transaction and complete withdrawal
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed raw transaction end complete withdrawal associated with it.
     * When broadcast succeeded but it is impossible to complete withdrawal, transaction id of transaction is returned and withdrawal must be completed manually.
     * </p>
     *
     * @param requestBody
     * @returns BroadcastResponse OK
     * @throws ApiError
     */
    public static broadcastBlockchainTransaction(
        requestBody: BroadcastWithdrawal,
    ): CancelablePromise<BroadcastResponse> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/withdrawal/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}