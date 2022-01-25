/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionTxInTheBlock = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionTxInTheBlock.type;
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when outgoing ledger transaction is included in the block.
         */
        url: string;
    };
}

export namespace CreateSubscriptionTxInTheBlock {

    /**
     * Type of the subscription.
     */
    export enum type {
        TRANSACTION_IN_THE_BLOCK = 'TRANSACTION_IN_THE_BLOCK',
    }


}
