/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { ImagePreview } from './ImagePreview';
import type { NftApprovedBy } from './NftApprovedBy';

export type NftCollection = {
    address: string;
    next_item_index: number;
    owner?: AccountAddress;
    raw_collection_content: string;
    metadata?: any;
    previews?: Array<ImagePreview>;
    approved_by: NftApprovedBy;
};
