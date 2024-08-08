/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Body_estimate_fee_estimateFee_post = {
    /**
     * Address in any format
     */
    address: string;
    /**
     * b64-encoded cell with message body
     */
    body: string;
    /**
     * b64-encoded cell with init-code
     */
    init_code?: string;
    /**
     * b64-encoded cell with init-data
     */
    init_data?: string;
    /**
     * If true during test query processing assume that all chksig operations return True
     */
    ignore_chksig?: boolean;
};
