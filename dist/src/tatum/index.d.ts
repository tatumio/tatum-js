import { Currency } from '../model/request';
import { Fiat } from '../model/response';
import { Rate } from '../model/response/common/Rate';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
export declare const getExchangeRate: (currency: Fiat | Currency, basePair?: Fiat) => Promise<Rate>;
