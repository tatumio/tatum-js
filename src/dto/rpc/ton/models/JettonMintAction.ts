/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonPreview } from './JettonPreview';

export type JettonMintAction = {
    recipient: AccountAddress;
    recipients_wallet: string;
    /**
     * amount in quanta of tokens
     */
    amount: string;
    jetton: JettonPreview;
};
