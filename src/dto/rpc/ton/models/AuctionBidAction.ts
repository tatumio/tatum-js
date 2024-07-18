/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { NftItem } from './NftItem';
import type { Price } from './Price';

export type AuctionBidAction = {
    auction_type: 'DNS.ton' | 'DNS.tg' | 'NUMBER.tg' | 'getgems';
    amount: Price;
    nft?: NftItem;
    bidder: AccountAddress;
    auction: AccountAddress;
};
