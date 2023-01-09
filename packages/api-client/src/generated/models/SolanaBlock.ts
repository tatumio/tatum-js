/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaBlockReward } from './SolanaBlockReward';
import type { SolanaBlockTx } from './SolanaBlockTx';

export type SolanaBlock = {
    blockHeight?: number;
    blockTime?: number;
    blockhash?: string;
    parentSlot?: number;
    previousBlockhash?: string;
    rewards?: Array<SolanaBlockReward>;
    transactions?: Array<SolanaBlockTx>;
}
