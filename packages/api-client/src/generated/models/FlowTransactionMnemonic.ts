/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTransactionMnemonic = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Type of asset to send
     */
    currency: FlowTransactionMnemonic.currency;
    /**
     * Blockchain address to send assets
     */
    to?: string;
    /**
     * Amount to be sent, in Flow.
     */
    amount: string;
    /**
     * Mnemonic to generate private key.
     */
    mnemonic: string;
    /**
     * Index to the specific address from mnemonic.
     */
    index: number;
}

export namespace FlowTransactionMnemonic {

    /**
     * Type of asset to send
     */
    export enum currency {
        FLOW = 'FLOW',
        FUSD = 'FUSD',
    }


}
