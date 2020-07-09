import axios from 'axios';
import {Account} from '../model/response/ledger/Account';

export const getAccountById = async (id: string): Promise<Account> => {
    return (await axios.get(`https://api.tatum.io/v3/ledger/account/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};