import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {CustomerUpdate} from '../model/request/CustomerUpdate';
import {Customer} from '../model/response/ledger/Customer';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getCustomerByExternalId" target="_blank">Tatum API documentation</a>
 */
export const getCustomer = async (id: string): Promise<Customer> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/findAllCustomers" target="_blank">Tatum API documentation</a>
 */
export const getAllCustomers = async (pageSize: number = 50, offset = 0): Promise<Customer[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer?pageSize=${pageSize}&offset=${offset}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/updateCustomer" target="_blank">Tatum API documentation</a>
 */
export const updateCustomer = async (id: string, data: CustomerUpdate): Promise<{ id: string }> => {
    await validateOrReject(data);
    return (await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}`, data, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export const activateCustomer = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}/activate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deactivateCustomer" target="_blank">Tatum API documentation</a>
 */
export const deactivateCustomer = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}/deactivate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/enableCustomer" target="_blank">Tatum API documentation</a>
 */
export const enableCustomer = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}/enable`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/disableCustomer" target="_blank">Tatum API documentation</a>
 */
export const disableCustomer = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/customer/${id}/disable`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};