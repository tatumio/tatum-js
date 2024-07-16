/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type WalletDNS = {
    address: string;
    account: AccountAddress;
    is_wallet: boolean;
    has_method_pubkey: boolean;
    has_method_seqno: boolean;
    names: Array<string>;
};
