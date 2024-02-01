/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * ID of the token.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX)
     */
    feeLimit: number;
}
