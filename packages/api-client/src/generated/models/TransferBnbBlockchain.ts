/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBnbBlockchain = {
    /**
     * Blockchain address to send assets.
     */
    to: string;
    /**
     * Currency to transfer from Binance Blockchain Account.
     */
    currency: 'BNB';
    /**
     * Amount to be sent in BNB.
     */
    amount: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
    /**
     * Message to recipient.
     */
    message?: string;
}
