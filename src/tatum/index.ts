import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Currency} from '../model/request';
import {Fiat} from '../model/response';
import {Rate} from '../model/response/common/Rate';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
export const getExchangeRate = async (currency: Fiat | Currency, basePair = Fiat.EUR): Promise<Rate> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tatum/rate/${currency}?basePair=${basePair}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};