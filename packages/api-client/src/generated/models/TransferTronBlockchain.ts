/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronBlockchain = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of TRON account in Base58 format.
     */
    to: string;
    /**
     * Amount to be sent in TRX.
     */
    amount: string;
}
