import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {CreateCurrency} from '../model/request/CreateCurrency';
import {CurrencyOperation} from '../model/request/CurrencyOperation';
import {UpdateCurrency} from '../model/request/UpdateCurrency';
import {Account} from '../model/response';
import {VC} from '../model/response/ledger/VC';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getCurrency" target="_blank">Tatum API documentation</a>
 */
export const getVirtualCurrencyByName = async (name: string): Promise<VC> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency/${name}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/createCurrency" target="_blank">Tatum API documentation</a>
 */
export const createVirtualCurrency = async (data: CreateCurrency): Promise<Account> => {
    await validateOrReject(data);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency`, data,{headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/updateCurrency" target="_blank">Tatum API documentation</a>
 */
export const updateVirtualCurrency = async (data: UpdateCurrency): Promise<void> => {
    await validateOrReject(data);
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency/`, data, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/mintCurrency" target="_blank">Tatum API documentation</a>
 */
export const mintVirtualCurrency = async (data: CurrencyOperation): Promise<{ reference: string }> => {
    await validateOrReject(data);
    return (await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency/mint`, data, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/revokeCurrency" target="_blank">Tatum API documentation</a>
 */
export const revokeVirtualCurrency = async (data: CurrencyOperation): Promise<{ reference: string }> => {
    await validateOrReject(data);
    return (await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency/revoke`, data, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};