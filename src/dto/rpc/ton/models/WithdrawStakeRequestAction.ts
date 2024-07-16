/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { PoolImplementationType } from './PoolImplementationType';

/**
 * validator's participation in elections
 */
export type WithdrawStakeRequestAction = {
    amount?: number;
    staker: AccountAddress;
    pool: AccountAddress;
    implementation: PoolImplementationType;
};
