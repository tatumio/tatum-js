/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronAccount = {
    /**
     * Account address
     */
    address: string;
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
    /**
     * Free usage of the network.
     */
    freeNetUsage: number;
    /**
     * Free usage limit of the network.
     */
    freeNetLimit?: number;
    /**
     * Extra usage of the network.
     */
    netUsage?: number;
    /**
     * Extra usage limit of the network.
     */
    netLimit?: number;
    /**
     * Remaining usage of the network, equal to freeNetLimit - freeNetUsed + netLimit - netUsed.
     */
    bandwidth: number;
}
