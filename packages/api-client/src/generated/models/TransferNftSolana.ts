/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftSolana = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address to send NFT token from. From this address, transaction fee will be paid.
     */
    from: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
