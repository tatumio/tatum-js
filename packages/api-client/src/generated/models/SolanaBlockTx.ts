/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaTxMeta } from './SolanaTxMeta';
import type { SolanaTxTransaction } from './SolanaTxTransaction';

export type SolanaBlockTx = {
    meta?: SolanaTxMeta;
    transaction?: SolanaTxTransaction;
}
