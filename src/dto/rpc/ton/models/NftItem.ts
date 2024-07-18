/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { ImagePreview } from './ImagePreview';
import type { NftApprovedBy } from './NftApprovedBy';
import type { Sale } from './Sale';
import type { TrustType } from './TrustType';

export type NftItem = {
    address: string;
    index: number;
    owner?: AccountAddress;
    collection?: {
        address: string;
        name: string;
        description: string;
    };
    verified: boolean;
    metadata: any;
    sale?: Sale;
    previews?: Array<ImagePreview>;
    dns?: string;
    approved_by: NftApprovedBy;
    include_cnft?: boolean;
    trust: TrustType;
};
