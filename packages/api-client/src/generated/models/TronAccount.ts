/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronAccount = {
    /**
     * Account address
     */
    address: string;
    /**
     * Free usage of the network
     */
    freeNetUsage: number;
    /**
     * Balance of the TRX, in SUN. SUN is 1/1000000 TRX.
     */
    balance: number;
    trc10: Array<{
        /**
         * Name of the TRC10 asset.
         */
        key: string;
        /**
         * Balance of the TRC10 asset.
         */
        value: number;
    }>;
    trc20: Array<any>;
    /**
     * Date of creation of the account in UTC millis.
     */
    createTime: number;
    /**
     * ID of the issued TRC10 token, if any.
     */
    assetIssuedId?: string;
    /**
     * Balance of the issued TRC10 token, if any.
     */
    assetIssuedName?: number;
}
