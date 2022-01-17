/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronTx20 = {
    /**
     * Transaction ID.
     */
    txID: string;
    tokenInfo: {
        symbol: string;
        address: string;
        decimals: number;
        name: string;
    };
    from: string;
    to: string;
    type: string;
    value: string;
}
