/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronBlockchainKMS = {
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Recipient address of TRON account in Base58 format.
     */
    to: string;
    /**
     * Amount to be sent in TRX.
     */
    amount: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
