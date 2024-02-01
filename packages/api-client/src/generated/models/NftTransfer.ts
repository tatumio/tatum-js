/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedDataCommon } from './DecodedDataCommon';

export type NftTransfer = (DecodedDataCommon & {
    /**
     * The unique identifier of the NFT being transferred.
     */
    tokenId?: string;
});
