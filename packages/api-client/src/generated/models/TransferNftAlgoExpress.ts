/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoExpress = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * Value to be sent.
     */
    value?: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
}
