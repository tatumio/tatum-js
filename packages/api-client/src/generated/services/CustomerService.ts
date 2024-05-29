/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CustomerUpdate } from '../models/CustomerUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CustomerService {

    /**
     * List all customers
     * <h4>1 credit per API call.</h4><br/>
     * <p>List of all customers. Also inactive an disabled customers are present.</p>
     *
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @returns Customer OK
     * @throws ApiError
     */
    public static findAllCustomers(
        pageSize: number,
        offset?: number,
    ): CancelablePromise<Array<Customer>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/customer`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get customer details
     * <h4>1 credit per API call.</h4><br/><p>Using anonymized external ID or internal customer ID you can access customer detail information. Internal ID is needed to call other customer related methods.</p>
     * @param id Customer external or internal ID
     * @returns Customer OK
     * @throws ApiError
     */
    public static getCustomerByExternalOrInternalId(
        id: string,
    ): CancelablePromise<Customer> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/customer/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Update customer
     * <h4>2 credits per API call.</h4><br/><p>This method is helpful in case your primary system will change ID's or customer will change the country he/she is supposed to be in compliance with.</p>
     * @param id Customer internal ID
     * @param requestBody
     * @returns Customer OK
     * @throws ApiError
     */
    public static updateCustomer(
        id: string,
        requestBody: CustomerUpdate,
    ): CancelablePromise<Customer> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/customer/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Activate customer
     * <h4>2 credits per API call.</h4><br/><p>Activated customer is able to do any operation.</p>
     * @param id Customer internal ID
     * @returns void
     * @throws ApiError
     */
    public static activateCustomer(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/customer/${id}/activate`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Deactivate customer
     * <h4>2 credits per API call.</h4><br/><p>Deactivate customer is not able to do any operation. Customer can be deactivated only when all their accounts are already deactivated.</p>
     * @param id Customer internal ID
     * @returns void
     * @throws ApiError
     */
    public static deactivateCustomer(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/customer/${id}/deactivate`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Enable customer
     * <h4>2 credits per API call.</h4><br/><p>Enabled customer can perform all operations. By default all customers are enabled. All previously blocked account balances will be unblocked.</p>
     * @param id Customer internal ID
     * @returns void
     * @throws ApiError
     */
    public static enableCustomer(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/customer/${id}/enable`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Disable customer
     * <h4>2 credits per API call.</h4><br/><p>Disabled customer cannot perform end-user operations, such as create new accounts or send transactions. Available balance on all accounts is set to 0. Account balance will stay untouched.</p>
     * @param id Customer internal ID
     * @returns void
     * @throws ApiError
     */
    public static disableCustomer(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/customer/${id}/disable`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
