/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Body_run_get_method_runGetMethod_post = {
    /**
     * Contract address
     */
    address: string;
    /**
     * Method name or method id
     */
    method: (string | number);
    /**
     * Array of stack elements: `[['num',3], ['cell', cell_object], ['slice', slice_object]]`
     */
    stack: Array<Array<any>>;
    /**
     * Seqno of masterchain block at which moment the Get Method is to be executed
     */
    seqno?: number;
};
