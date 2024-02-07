/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedDataCommon } from './DecodedDataCommon';

export type FungibleTransfer = (DecodedDataCommon & {
    /**
     * The number of decimal places for the transferred token.
     */
    decimals?: number;
    /**
     * The value of the transferred token.
     */
    value?: string;
});
