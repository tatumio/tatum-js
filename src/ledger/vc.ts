import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {VC} from '../model/response/ledger/VC';

export const getVirtualCurrencyByName = async (name: string): Promise<VC> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/virtualCurrency/${name}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};