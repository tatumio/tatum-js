/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionKMSError = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionKMSError.type;
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

export namespace CreateSubscriptionKMSError {

    /**
     * Type of the subscription.
     */
    export enum type {
        KMS_FAILED_TX = 'KMS_FAILED_TX',
    }


}
