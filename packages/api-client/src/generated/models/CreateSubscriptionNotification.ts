/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionNotification = {
    /**
     * Type of the subscription.
     */
    type: 'ADDRESS_TRANSACTION';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * Blockchain address to watch.
         */
        address: string;
        /**
         * Blockchain of the address.
         */
        chain: 'SOL' | 'ETH' | 'MATIC' | 'CELO' | 'KLAY' | 'BTC' | 'LTC' | 'BCH' | 'DOGE' | 'TRON' | 'BSC' | 'FLR';
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when transaction is detected on the address.
         */
        url: string;
    };
}
