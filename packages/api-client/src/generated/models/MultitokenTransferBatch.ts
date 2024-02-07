/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MultitokenTransfer } from './MultitokenTransfer';

export type MultitokenTransferBatch = (MultitokenTransfer & {
    /**
     * The unique identifiers of the multitokens being transferred.
     */
    multitokenIds?: Array<string>;
    /**
     * The values of the multitokens being transferred.
     */
    multitokenValues?: Array<string>;
});
