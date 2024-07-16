/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockchainBlock } from './BlockchainBlock';

export type BlockchainBlockShards = {
    shards: Array<{
        last_known_block_id: string;
        last_known_block: BlockchainBlock;
    }>;
};
