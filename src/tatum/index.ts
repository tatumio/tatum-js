import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Currency} from '../model/request';
import {Fiat} from '../model/response';
import {Rate} from '../model/response/common/Rate';

export const getExchangeRate = async (currency: Fiat | Currency): Promise<Rate> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tatum/rate/${currency}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};