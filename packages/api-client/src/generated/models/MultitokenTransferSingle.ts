/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MultitokenTransfer } from './MultitokenTransfer';

export type MultitokenTransferSingle = (MultitokenTransfer & {
    /**
     * The unique identifier of the single multitoken being transferred.
     */
    multitokenId?: string;
    /**
     * The value of the single multitoken being transferred.
     */
    multitokenValue?: string;
});
