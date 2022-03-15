/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTerraBlockchain = {
    /**
     * Blockchain address to send assets.
     */
    to: string;
    /**
     * Currency to transfer from Binance Blockchain Account.
     */
    currency: 'LUNA' | 'LUNA_UST' | 'LUNA_KRT';
    /**
     * Amount to be sent in currency.
     */
    amount: string;
    /**
     * Fee to be charged for the operation.
     */
    fee?: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
    /**
     * Memo to recipient.
     */
    memo?: string;
}
