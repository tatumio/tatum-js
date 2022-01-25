/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScryptaTx } from './ScryptaTx';

export type ScryptaBlock = {
    hash?: string;
    confirmations?: number;
    size?: number;
    height?: number;
    version?: number;
    merkleroot?: string;
    tx?: Array<string>;
    time?: number;
    nonce?: number;
    bits?: string;
    difficulty?: number;
    chainwork?: string;
    previousblockhash?: string;
    nextblockhash?: string;
    txs?: Array<ScryptaTx>;
}
