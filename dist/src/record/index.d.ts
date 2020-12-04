import { Currency } from '../model/request';
import { Rate } from '../model/response/common/Rate';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetLog" target="_blank">Tatum API documentation</a>
 */
export declare const getLogRecord: (chain: Currency, id: string) => Promise<Rate>;
