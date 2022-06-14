/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BnbTransaction } from './BnbTransaction';

export type BnbBlock = {
    timestamp?: number;
    blockHeight?: number;
    tx?: Array<BnbTransaction>;
}
