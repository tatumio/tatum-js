/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { FungibleTransfer } from './FungibleTransfer';
import type { MultitokenTransferBatch } from './MultitokenTransferBatch';
import type { MultitokenTransferSingle } from './MultitokenTransferSingle';
import type { NftTransfer } from './NftTransfer';
import type { RawData } from './RawData';
import type { StablecoinTransfer } from './StablecoinTransfer';
import type { UniswapTradeV2 } from './UniswapTradeV2';
import type { UniswapTradeV3 } from './UniswapTradeV3';

export type Event = {
    chain?: Chain;
    /**
     * The address associated with the event.
     */
    address?: string;
    /**
     * The block number where the event was recorded.
     */
    blockNumber?: number;
    /**
     * The timestamp of the event in UNIX format.
     */
    timestamp?: number;
    /**
     * The decoded event data based on the given models.
     */
    decoded?: (FungibleTransfer | StablecoinTransfer | NftTransfer | MultitokenTransferSingle | MultitokenTransferBatch | UniswapTradeV2 | UniswapTradeV3);
    raw?: RawData;
    /**
     * The transaction hash related to the event.
     */
    txHash?: string;
    /**
     * The transaction index within the block.
     */
    txIndex?: number;
    /**
     * The log index within the transaction.
     */
    logIndex?: number;
}
