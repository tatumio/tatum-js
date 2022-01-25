/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBnbBlockchainKMS = {
    /**
     * Blockchain address to send assets.
     */
    to: string;
    /**
     * Currency to transfer from Binance Blockchain Account.
     */
    currency: TransferBnbBlockchainKMS.currency;
    /**
     * Amount to be sent in BNB.
     */
    amount: string;
    /**
     * Signature hash of the mnemonic, which will be used to sign transactions locally.
     * All signature Ids should be present, which might be used to sign transaction.
     *
     */
    signatureId: string;
    /**
     * Blockchain address to send from
     */
    fromAddress: string;
    /**
     * Message to recipient.
     */
    message?: string;
}

export namespace TransferBnbBlockchainKMS {

    /**
     * Currency to transfer from Binance Blockchain Account.
     */
    export enum currency {
        BNB = 'BNB',
    }


}
