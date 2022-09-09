/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WebHook = {
    /**
     * Type of the subscription.
     */
    type: 'INCOMING_BLOCKCHAIN_HOOK' | 'ADDRESS_TRANSACTION' | 'CONTRACT_LOG_EVENT' | 'TRADE_MATCH' | 'TRADE_PARTIAL_FILL' | 'PENDING_BLOCKCHAIN_HOOK' | 'TRANSACTION_IN_THE_BLOCK' | 'KMS_FAILED_TX' | 'KMS_COMPLETED_TX';
    /**
     * ID of the WebHook
     */
    id: string;
    /**
     * ID of the subscription
     */
    subscriptionId: string;
    /**
     * ID of the subscription
     */
    url: string;
    /**
     * Data of webhook
     */
    data: any;
    /**
     * Next webhook execution try time
     */
    nextTime?: number;
    /**
     * Webhook execution time
     */
    timestamp?: number;
    /**
     * Number
     */
    retryCount?: number;
    /**
     * Flag indicating whether this webhook was successful or not
     */
    failed: boolean;
    /**
     * Response from the server in case the webhook was unsuccessful
     */
    response: {
        /**
         * HTTP Status
         */
        code?: number;
        /**
         * Response from the server
         */
        data?: string;
        /**
         * Flag indicating whether an error has been caused by the network
         */
        networkError: boolean;
    };
}
