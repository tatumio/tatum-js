/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTerraBlockchainKMS = {
    /**
     * Blockchain address to send assets.
     */
    to: string;
    /**
     * Currency to transfer from Binance Blockchain Account.
     */
    currency: 'LUNA' | 'LUNA_USD' | 'LUNA_KRW';
    /**
     * Amount to be sent in currency.
     */
    amount: string;
    /**
     * Fee to be charged for the operation.
     */
    fee?: string;
    /**
     * Signature hash of the mnemonic, which will be used to sign transactions locally.
     * All signature Ids should be present, which might be used to sign transaction.
     *
     */
    signatureId: string;
    /**
     * Memo to recipient.
     */
    memo?: string;
}
