/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { StateInit } from './StateInit';

export type Message = {
    msg_type: 'int_msg' | 'ext_in_msg' | 'ext_out_msg';
    created_lt: number;
    ihr_disabled: boolean;
    bounce: boolean;
    bounced: boolean;
    value: number;
    fwd_fee: number;
    ihr_fee: number;
    destination?: AccountAddress;
    source?: AccountAddress;
    import_fee: number;
    created_at: number;
    op_code?: string;
    init?: StateInit;
    hash: string;
    /**
     * hex-encoded BoC with raw message body
     */
    raw_body?: string;
    decoded_op_name?: string;
    decoded_body?: any;
};
