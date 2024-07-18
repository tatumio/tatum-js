/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftItem } from './NftItem';

export type DomainInfo = {
    name: string;
    /**
     * date of expiring. optional. not all domain in ton has expiration date
     */
    expiring_at?: number;
    item?: NftItem;
};
