/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Value to be sent.
     */
    value?: string;
    /**
     * Blockchain address to send NFT token from
     */
    from: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
