/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockCurrencyCollection } from './BlockCurrencyCollection';

export type BlockValueFlow = {
    from_prev_blk: BlockCurrencyCollection;
    to_next_blk: BlockCurrencyCollection;
    imported: BlockCurrencyCollection;
    exported: BlockCurrencyCollection;
    fees_collected: BlockCurrencyCollection;
    burned?: BlockCurrencyCollection;
    fees_imported: BlockCurrencyCollection;
    recovered: BlockCurrencyCollection;
    created: BlockCurrencyCollection;
    minted: BlockCurrencyCollection;
};
