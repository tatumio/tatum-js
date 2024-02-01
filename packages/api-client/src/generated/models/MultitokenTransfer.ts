/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedDataCommon } from './DecodedDataCommon';

export type MultitokenTransfer = (DecodedDataCommon & {
    /**
     * The address of the operator initiating the transfer.
     */
    operator?: string;
});
