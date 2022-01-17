/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTransactionPK = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Type of asset to send
     */
    currency: FlowTransactionPK.currency;
    /**
     * Blockchain address to send assets
     */
    to?: string;
    /**
     * Amount to be sent, in Flow.
     */
    amount: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    privateKey: string;
}

export namespace FlowTransactionPK {

    /**
     * Type of asset to send
     */
    export enum currency {
        FLOW = 'FLOW',
        FUSD = 'FUSD',
    }


}
