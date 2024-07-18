/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { DecodedRawMessage } from './DecodedRawMessage';

export type DecodedMessage = {
    destination: AccountAddress;
    destination_wallet_version: string;
    ext_in_msg_decoded?: {
        wallet_v3?: {
            subwallet_id: number;
            valid_until: number;
            seqno: number;
            raw_messages: Array<DecodedRawMessage>;
        };
        wallet_v4?: {
            subwallet_id: number;
            valid_until: number;
            seqno: number;
            op: number;
            raw_messages: Array<DecodedRawMessage>;
        };
        wallet_highload_v2?: {
            subwallet_id: number;
            bounded_query_id: string;
            raw_messages: Array<DecodedRawMessage>;
        };
    };
};
