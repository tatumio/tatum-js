/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftSolana = {
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
     * The private key of the blockchain address that you are sending the NFT from (the address that you specified in the <code>from</code> parameter)
     */
    fromPrivateKey: string;
    /**
     * Address on the Solana blockchain, from which the fee will be paid for transaction. Defaults to from.
     */
    feePayer?: string;
    /**
     * Private key of the fee payer address.
     */
    feePayerPrivateKey?: string;
}
