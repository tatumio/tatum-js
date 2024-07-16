/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { EncryptedComment } from './EncryptedComment';
import type { JettonPreview } from './JettonPreview';
import type { Refund } from './Refund';

export type JettonTransferAction = {
    sender?: AccountAddress;
    recipient?: AccountAddress;
    senders_wallet: string;
    recipients_wallet: string;
    /**
     * amount in quanta of tokens
     */
    amount: string;
    comment?: string;
    encrypted_comment?: EncryptedComment;
    refund?: Refund;
    jetton: JettonPreview;
};
