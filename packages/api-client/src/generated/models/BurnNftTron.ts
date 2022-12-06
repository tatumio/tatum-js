/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * ID of token to be destroyed.
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
