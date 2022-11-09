/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftAlgo = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The ID of the NFT to burn; this is the ID from the <code>assetIndex</code> parameter returned in the response body of the <a href="#operation/NftMintErc721">minting call</a>
     */
    contractAddress: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
}
