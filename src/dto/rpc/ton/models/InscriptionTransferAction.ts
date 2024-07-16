/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type InscriptionTransferAction = {
    sender: AccountAddress;
    recipient: AccountAddress;
    /**
     * amount in minimal particles
     */
    amount: string;
    comment?: string;
    type: 'ton20' | 'gram20';
    ticker: string;
    decimals: number;
};
