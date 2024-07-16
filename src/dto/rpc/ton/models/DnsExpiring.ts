/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftItem } from './NftItem';

export type DnsExpiring = {
    items: Array<{
        expiring_at: number;
        name: string;
        dns_item?: NftItem;
    }>;
};
