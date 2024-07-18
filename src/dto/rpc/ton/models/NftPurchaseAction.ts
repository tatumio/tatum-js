/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { NftItem } from './NftItem';
import type { Price } from './Price';

export type NftPurchaseAction = {
    auction_type: 'DNS.ton' | 'DNS.tg' | 'NUMBER.tg' | 'getgems';
    amount: Price;
    nft: NftItem;
    seller: AccountAddress;
    buyer: AccountAddress;
};
