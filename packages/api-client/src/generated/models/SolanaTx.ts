/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaTxMeta } from './SolanaTxMeta';
import type { SolanaTxTransaction } from './SolanaTxTransaction';

export type SolanaTx = {
    blockTime?: number;
    meta?: SolanaTxMeta;
    transaction?: SolanaTxTransaction;
    slot?: number;
}
