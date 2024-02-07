/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

/**
 * FIAT value in EURO of the FIAT or crypto asset.
 */
export type ExchangeRate = {
    /**
     * FIAT or crypto asset.
     */
    id: FiatOrCryptoCurrency;
    /**
     * FIAT value of the asset in given base pair.
     */
    value: string;
    /**
     * Base pair.
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * Date of validity of rate in UTC.
     */
    timestamp: number;
    /**
     * Source of base pair.
     */
    source: string;
    /**
     * Used for identification in batch calls
     */
    batchId?: string;
}
