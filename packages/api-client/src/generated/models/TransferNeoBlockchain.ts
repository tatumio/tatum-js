/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNeoBlockchain = {
    /**
     * Recipient address.
     */
    to: string;
    /**
     * Assets to send.
     */
    assets: {
        /**
         * Amount of NEO to be sent.
         */
        NEO?: number;
        /**
         * Amount of GAS to be sent.
         */
        GAS?: number;
    };
    /**
     * Private key of address to send assets from.
     */
    fromPrivateKey: string;
}
