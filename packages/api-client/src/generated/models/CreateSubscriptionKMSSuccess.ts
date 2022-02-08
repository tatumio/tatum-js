/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionKMSSuccess = {
    /**
     * Type of the subscription.
     */
    type: 'KMS_COMPLETED_TX';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when tx is sucessfully broadcasted using Tatum KMS.
         */
        url: string;
    };
}
