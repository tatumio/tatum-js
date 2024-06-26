/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionNftTransferEvent = {
    /**
     * Type of the subscription.
     */
    type: 'CONTRACT_NFT_TXS_PER_BLOCK';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * The blockchain on which events should be monitored.
         */
        chain: 'ETH' | 'MATIC' | 'CELO' | 'KLAY' | 'BSC' | 'FLR' | 'CRO' | 'BASE' | 'AVAX' | 'FTM';
        /**
         * The URL of the endpoint where an HTTP POST request will be sent when the block where the events from the smart contracts are reflected gets completed.
         */
        url: string;
    };
}
