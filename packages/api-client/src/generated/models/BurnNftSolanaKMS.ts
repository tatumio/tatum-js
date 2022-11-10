/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftSolanaKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address to send the NFT from; this is the address that you used in the <code>to</code> parameter in the request body of the <a href="#operation/NftMintErc721">minting call</a>; from this address, the transaction fee will be paid
     */
    from: string;
    /**
     * The blockchain address of the NFT; this is the address from the <code>nftAddress</code> parameter returned in the response body of the <a href="#operation/NftMintErc721">minting call</a>
     */
    contractAddress: string;
    /**
     * The blockchain address of the NFT collection
     */
    collection?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Blockchain address to pay the fee for the transaction from
     */
    feePayer?: string;
    /**
     * Identifier of the private key used for paying the gas costs in signing application. Defaults to the signatureId.
     */
    feePayerSignatureId?: string;
}
