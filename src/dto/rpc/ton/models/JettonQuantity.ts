/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonPreview } from './JettonPreview';

export type JettonQuantity = {
    quantity: string;
    wallet_address: AccountAddress;
    jetton: JettonPreview;
};
