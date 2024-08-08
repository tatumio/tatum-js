/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Body_send_query_sendQuery_post = {
    /**
     * Address in any format
     */
    address: string;
    /**
     * b64-encoded boc-serialized cell with message body
     */
    body: string;
    /**
     * b64-encoded boc-serialized cell with init-code
     */
    init_code?: string;
    /**
     * b64-encoded boc-serialized cell with init-data
     */
    init_data?: string;
};
