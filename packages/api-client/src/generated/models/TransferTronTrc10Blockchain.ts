/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronTrc10Blockchain = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of TRON account in Base58 format.
     */
    to: string;
    /**
     * ID of the token to transfer.
     */
    tokenId: string;
    /**
     * Amount to be sent in TRX.
     */
    amount: string;
}
