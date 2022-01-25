/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionKMSSuccess = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionKMSSuccess.type;
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

export namespace CreateSubscriptionKMSSuccess {

    /**
     * Type of the subscription.
     */
    export enum type {
        KMS_COMPLETED_TX = 'KMS_COMPLETED_TX',
    }


}
