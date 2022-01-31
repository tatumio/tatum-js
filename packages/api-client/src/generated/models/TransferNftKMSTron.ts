/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftKMSTron = {
    /**
     * If token to be transferred is Royalty NFT token, this is a value to be paid as a cashback to the authors of the token.
     */
    value?: string;
    /**
     * Chain to work with.
     */
    chain: 'TRON';
    /**
     * Blockchain address to perform transaction from
     */
    account: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * ID of token.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Max limit for fee to be paid, in TRX.
     */
    feeLimit: number;
}
