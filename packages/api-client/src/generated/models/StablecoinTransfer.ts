/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FungibleTransfer } from './FungibleTransfer';

export type StablecoinTransfer = (FungibleTransfer & {
    /**
     * The address of the stablecoin being transferred.
     */
    stablecoin?: string;
});
