import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Currency} from '../model/request';
import {Rate} from '../model/response/common/Rate';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/GetLog" target="_blank">Tatum API documentation</a>
 */
export const getLogRecord = async (chain: Currency, id: string): Promise<Rate> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/record?chain=${chain}&id=${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};