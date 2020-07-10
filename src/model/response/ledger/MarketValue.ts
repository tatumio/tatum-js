/**
 *
 * @export
 * @interface MarketValue
 */
import {Fiat} from './Fiat';

export interface MarketValue {
    /**
     * Value of transaction in given base pair.
     * @type {string}
     * @memberof MarketValue
     */
    amount?: string;
    /**
     * Base pair.
     * @type {string}
     * @memberof MarketValue
     */
    currency?: Fiat;
    /**
     * Date of validity of rate in UTC.
     * @type {number}
     * @memberof MarketValue
     */
    sourceDate?: number;
    /**
     * Source of base pair.
     * @type {string}
     * @memberof MarketValue
     */
    source?: string;
}