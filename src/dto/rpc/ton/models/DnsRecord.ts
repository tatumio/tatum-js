/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletDNS } from './WalletDNS';

export type DnsRecord = {
    wallet?: WalletDNS;
    next_resolver?: string;
    sites: Array<string>;
    /**
     * tonstorage bag id
     */
    storage?: string;
};
