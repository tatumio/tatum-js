/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { EncryptedComment } from './EncryptedComment';
import type { Refund } from './Refund';

export type TonTransferAction = {
    sender: AccountAddress;
    recipient: AccountAddress;
    /**
     * amount in nanotons
     */
    amount: number;
    comment?: string;
    encrypted_comment?: EncryptedComment;
    refund?: Refund;
};
