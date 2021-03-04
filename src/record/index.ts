import { get } from '../connector/tatum'
import {Currency} from '../model';
import {Rate} from '../model/response/common/Rate';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetLog" target="_blank">Tatum API documentation</a>
 */
export const getLogRecord = async (chain: Currency, id: string): Promise<Rate> => get(`/v3/record?chain=${chain}&id=${id}`);