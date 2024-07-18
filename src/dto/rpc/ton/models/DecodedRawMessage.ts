/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DecodedRawMessage = {
    message: {
        boc: string;
        decoded_op_name?: string;
        op_code?: string;
        decoded_body?: any;
    };
    mode: number;
};
