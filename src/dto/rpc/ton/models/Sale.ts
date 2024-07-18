/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { Price } from './Price';

export type Sale = {
    address: string;
    market: AccountAddress;
    owner?: AccountAddress;
    price: Price;
};
