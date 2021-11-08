import { Customer, CustomerUpdate, get, put } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCustomerByExternalId" target="_blank">Tatum API documentation</a>
 */
export const getCustomer = async (id: string): Promise<Customer> => get(`/v3/ledger/customer/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/findAllCustomers" target="_blank">Tatum API documentation</a>
 */
export const getAllCustomers = async (pageSize = 50, offset = 0): Promise<Customer[]> =>
  get(`/v3/ledger/customer?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCustomer" target="_blank">Tatum API documentation</a>
 */
export const updateCustomer = async (id: string, data: CustomerUpdate): Promise<{ id: string }> =>
  put(`/v3/ledger/customer/${id}`, data, CustomerUpdate)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export const activateCustomer = async (id: string): Promise<void> => put(`/v3/ledger/customer/${id}/activate`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateCustomer" target="_blank">Tatum API documentation</a>
 */
export const deactivateCustomer = async (id: string): Promise<void> => put(`/v3/ledger/customer/${id}/deactivate`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/enableCustomer" target="_blank">Tatum API documentation</a>
 */
export const enableCustomer = async (id: string): Promise<void> => put(`/v3/ledger/customer/${id}/enable`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/disableCustomer" target="_blank">Tatum API documentation</a>
 */
export const disableCustomer = async (id: string): Promise<void> => put(`/v3/ledger/customer/${id}/disable`)
