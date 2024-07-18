/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type SubscriptionAction = {
    subscriber: AccountAddress;
    subscription: string;
    beneficiary: AccountAddress;
    amount: number;
    initial: boolean;
};
