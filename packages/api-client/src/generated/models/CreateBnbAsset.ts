/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type CreateBnbAsset = {
    /**
     * Asset name.
     */
    token: string;
    /**
     * Base pair for Asset. Transaction value will be calculated according to this base pair. e.g. 1 TOKEN123 is equal to 1 EUR, if basePair is set to EUR.
     */
    basePair: FiatOrCryptoCurrency;
}
