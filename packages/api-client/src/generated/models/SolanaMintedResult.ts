/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaMintedResult = {
    /**
     * The ID of the transaction
     */
    txId?: string;
    /**
     * The blockchain address of the minted NFT
     */
    nftAddress?: string;
    /**
     * The blockchain address that received the minted NFT; this address was created under the recipient's account address (the one in the <code>to</code> parameter of the request body), is owned by the recipient's address, and has the same private key
     */
    nftAccountAddress?: string;
}
