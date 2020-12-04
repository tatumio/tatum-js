import { CustomerUpdate } from '../model/request/CustomerUpdate';
import { Customer } from '../model/response/ledger/Customer';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCustomerByExternalId" target="_blank">Tatum API documentation</a>
 */
export declare const getCustomer: (id: string) => Promise<Customer>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/findAllCustomers" target="_blank">Tatum API documentation</a>
 */
export declare const getAllCustomers: (pageSize?: number, offset?: number) => Promise<Customer[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCustomer" target="_blank">Tatum API documentation</a>
 */
export declare const updateCustomer: (id: string, data: CustomerUpdate) => Promise<{
    id: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export declare const activateCustomer: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateCustomer" target="_blank">Tatum API documentation</a>
 */
export declare const deactivateCustomer: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/enableCustomer" target="_blank">Tatum API documentation</a>
 */
export declare const enableCustomer: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/disableCustomer" target="_blank">Tatum API documentation</a>
 */
export declare const disableCustomer: (id: string) => Promise<void>;
