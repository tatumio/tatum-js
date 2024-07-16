/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonPreview } from './JettonPreview';

export type JettonSwapAction = {
    dex: 'stonfi' | 'dedust' | 'megatonfi';
    amount_in: string;
    amount_out: string;
    ton_in?: number;
    ton_out?: number;
    user_wallet: AccountAddress;
    router: AccountAddress;
    jetton_master_in?: JettonPreview;
    jetton_master_out?: JettonPreview;
};
