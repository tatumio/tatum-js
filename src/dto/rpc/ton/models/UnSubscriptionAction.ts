/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type UnSubscriptionAction = {
    subscriber: AccountAddress;
    subscription: string;
    beneficiary: AccountAddress;
};
