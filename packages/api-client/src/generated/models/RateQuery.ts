/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatCurrency } from './FiatCurrency';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type RateQuery = {
    /**
     * Used for identification, will be returned with result pair
     */
    batchId: string;
    /**
     * Base pair.
     */
    basePair: FiatCurrency;
    /**
     * FIAT or crypto asset.
     */
    currency: FiatOrCryptoCurrency;
}
