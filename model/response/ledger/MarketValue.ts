/**
 *
 * @export
 * @interface MarketValue
 */
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
    currency?: MarketValue.CurrencyEnum;
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