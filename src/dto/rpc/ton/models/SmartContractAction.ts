/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { Refund } from './Refund';

export type SmartContractAction = {
    executor: AccountAddress;
    contract: AccountAddress;
    /**
     * amount in nanotons
     */
    ton_attached: number;
    operation: string;
    payload?: string;
    refund?: Refund;
};
