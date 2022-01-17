/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XrpAccountBalance = {
    /**
     * Different assets other then XRP available on the account.
     */
    assets?: Array<{
        /**
         * Balance of the asset.
         */
        balance?: string;
        /**
         * Asset identifier.
         */
        currency?: string;
    }>;
    /**
     * Balance of XRP, in drops.
     */
    balance?: string;
}
