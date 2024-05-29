/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateContractAddressLogEventSubscription = {
    /**
     * Type of the subscription.
     */
    type: string;
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * Blockchain address to watch.
         */
        contractAddress: string;
        /**
         * Blockchain of the address.
         */
        chain: 'ETH' | 'MATIC' | 'CELO' | 'KLAY' | 'BSC' | 'TEZOS' | 'FLR';
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when transaction is detected on the address.
         */
        url: string;
        /**
         * Event to watch. In case of EVM chains it is usually a hash of the event signature. In case of Tezos it is a name of the event and max length is not enforced.
         */
        event: string;
    };
}
