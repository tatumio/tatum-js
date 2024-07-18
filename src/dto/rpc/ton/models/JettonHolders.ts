/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type JettonHolders = {
    addresses: Array<{
        address: string;
        owner: AccountAddress;
        /**
         * balance in the smallest jetton's units
         */
        balance: string;
    }>;
    /**
     * total number of holders
     */
    total: number;
};
