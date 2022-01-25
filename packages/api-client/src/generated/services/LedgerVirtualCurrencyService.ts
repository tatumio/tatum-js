/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { TransactionResult } from '../models/TransactionResult';
import type { VC } from '../models/VC';
import type { VirtualCurrency } from '../models/VirtualCurrency';
import type { VirtualCurrencyOperation } from '../models/VirtualCurrencyOperation';
import type { VirtualCurrencyUpdate } from '../models/VirtualCurrencyUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class LedgerVirtualCurrencyService {

    /**
     * Create new virtual currency
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create new virtual currency with given supply stored in account. This will create Tatum internal virtual currency. Every virtual currency must be prefixed with <b>VC_</b>.<br/>
     * Every virtual currency must be pegged to existing FIAT or supported cryptocurrency. 1 unit of virtual currency has then the same amount as 1 unit of the base currency it is pegged to. It is possible to set a custom base rate for the virtual currency. (baseRate = 2 => 1 VC unit = 2 basePair units)<br/>
     * Tatum virtual currency acts as any other asset within Tatum. For creation of ERC20 token, see <a href=\"#tatum-blockchain-api-erc20\">ERC20 </a>.<br/>
     * This operation returns the newly created Tatum Ledger account with an initial balance set to the virtual currency's total supply. Total supply can be changed in the future.</p>
     *
     * @param requestBody
     * @returns Account OK
     * @throws ApiError
     */
    public static createCurrency(
        requestBody: VirtualCurrency,
    ): CancelablePromise<Account> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/virtualCurrency`,
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
     * Update virtual currency
     * <h4>2 credits per API call.</h4><br/><p>Change base pair and/or base rate of existing virtual currency.</p>
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateCurrency(
        requestBody: VirtualCurrencyUpdate,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/virtualCurrency`,
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
     * Get virtual currency
     * <h4>1 credit per API call.</h4><br/><p>Get detail of virtual currency.<p>
     * @param name
     * @returns VC OK
     * @throws ApiError
     */
    public static getCurrency(
        name: string,
    ): CancelablePromise<VC> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/virtualCurrency/${name}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Create new supply of virtual currency
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create new supply of virtual currency linked on the given accountId. Method increases the total supply of the currency.<br/>
     * This method creates Ledger transaction with operationType MINT with undefined counterAccountId.<p>
     *
     * @param requestBody
     * @returns TransactionResult OK
     * @throws ApiError
     */
    public static mintCurrency(
        requestBody: VirtualCurrencyOperation,
    ): CancelablePromise<TransactionResult> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/virtualCurrency/mint`,
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
     * Destroy supply of virtual currency
     * <h4>2 credits per API call.</h4><br/>
     * <p>Destroy supply of virtual currency linked on the given accountId. Method decreases the total supply of the currency.<br/>
     * This method creates Ledger transaction with operationType REVOKE with undefined counterAccountId.</p>
     *
     * @param requestBody
     * @returns TransactionResult OK
     * @throws ApiError
     */
    public static revokeCurrency(
        requestBody: VirtualCurrencyOperation,
    ): CancelablePromise<TransactionResult> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/virtualCurrency/revoke`,
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