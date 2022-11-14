/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoExpress = {
    /**
     * The blockchain to work with
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
     * Blockchain address to send NFT token from
     */
    from: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
