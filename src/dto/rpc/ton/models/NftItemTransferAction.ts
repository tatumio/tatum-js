/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { EncryptedComment } from './EncryptedComment';
import type { Refund } from './Refund';

export type NftItemTransferAction = {
    sender?: AccountAddress;
    recipient?: AccountAddress;
    nft: string;
    comment?: string;
    encrypted_comment?: EncryptedComment;
    /**
     * raw hex encoded payload
     */
    payload?: string;
    refund?: Refund;
};
