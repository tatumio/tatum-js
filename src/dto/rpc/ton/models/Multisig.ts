/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MultisigOrder } from './MultisigOrder';

export type Multisig = {
    address: string;
    seqno: number;
    threshold: number;
    signers: Array<string>;
    proposers: Array<string>;
    orders: Array<MultisigOrder>;
};
