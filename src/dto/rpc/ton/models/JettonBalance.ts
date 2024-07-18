/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonPreview } from './JettonPreview';
import type { TokenRates } from './TokenRates';

export type JettonBalance = {
    balance: string;
    price?: TokenRates;
    wallet_address: AccountAddress;
    jetton: JettonPreview;
    lock?: {
        amount: string;
        till: number;
    };
};
