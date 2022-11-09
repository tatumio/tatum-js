/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftAlgoKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The ID of the NFT to burn; this is the ID from the <code>assetIndex</code> parameter returned in the response body of the <a href="#operation/NftMintErc721">minting call</a>
     */
    contractAddress: string;
    /**
     * Blockchain address to burn NFT token from
     */
    from: string;
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
