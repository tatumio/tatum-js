import { get } from '../connector/tatum'
import {Currency} from '../model';
import {Fiat} from '../model';
import {Rate} from '../model/response/common/Rate';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
export const getExchangeRate = async (currency: Fiat | Currency, basePair = Fiat.EUR): Promise<Rate> =>
  get(`/v3/tatum/rate/${currency}?basePair=${basePair}`);