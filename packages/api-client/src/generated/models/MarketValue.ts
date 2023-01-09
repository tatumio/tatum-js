/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

/**
 * FIAT value of transaction.
 */
export type MarketValue = {
    /**
     * Value of transaction in given base pair.
     */
    amount: string;
    /**
     * Base pair.
     */
    currency: FiatOrCryptoCurrency;
    /**
     * Date of validity of rate in UTC.
     */
    sourceDate: number;
    /**
     * Source of base pair.
     */
    source: string;
}
