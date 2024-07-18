/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonPreview } from './JettonPreview';

export type ValueFlow = {
    account: AccountAddress;
    ton: number;
    fees: number;
    jettons?: Array<{
        account: AccountAddress;
        jetton: JettonPreview;
        quantity: number;
    }>;
};
