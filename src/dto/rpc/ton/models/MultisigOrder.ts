/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MultisigOrder = {
    address: string;
    order_seqno: number;
    threshold: number;
    sent_for_execution: boolean;
    signers: Array<string>;
    approvals_num: number;
    expiration_date: number;
};
