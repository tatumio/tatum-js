/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionKMSError = {
    /**
     * Type of the subscription.
     */
    type: 'KMS_FAILED_TX';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when error occurs inside Tatum KMS.
         */
        url: string;
    };
}
