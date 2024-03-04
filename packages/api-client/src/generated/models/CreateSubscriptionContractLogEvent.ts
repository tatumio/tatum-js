/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionContractLogEvent = {
    /**
     * Type of the subscription.
     */
    type: 'CONTRACT_LOG_EVENT';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * Hexadecimal data representing the event emitted from the smart contract; represents "topic[0]" from the event log.
         */
        event: string;
        /**
         * The blockchain on which events should be monitored.
         */
        chain: 'ETH' | 'MATIC' | 'CELO' | 'KLAY' | 'BSC' | 'FLR' | 'CRO';
        /**
         * The URL of the endpoint where an HTTP POST request will be sent when the block where the events from the smart contracts are reflected gets completed.
         */
        url: string;
    };
}
