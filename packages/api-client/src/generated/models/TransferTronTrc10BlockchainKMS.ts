/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronTrc10BlockchainKMS = {
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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
