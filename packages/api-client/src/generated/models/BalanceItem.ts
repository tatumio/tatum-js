/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FungibleTokenBalance } from './FungibleTokenBalance';
import type { NativeTokenBalance } from './NativeTokenBalance';
import type { NftBalance } from './NftBalance';

export type BalanceItem = (NativeTokenBalance | NftBalance | FungibleTokenBalance);
