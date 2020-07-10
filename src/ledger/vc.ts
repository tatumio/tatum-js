import axios from 'axios';
import {VC} from '../model/response/ledger/VC';

export const getVirtualCurrencyByName = async (name: string): Promise<VC> => {
    return (await axios.get(`https://api.tatum.io/v3/ledger/virtualCurrency/${name}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};