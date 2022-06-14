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
        chain: 'SOL' | 'BTC' | 'LTC' | 'DOGE' | 'ETH' | 'MATIC' | 'KLAY' | 'LUNA' | 'CELO' | 'BCH' | 'EOS';
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when transaction is detected on the address.
         */
        url: string;
    };
}
