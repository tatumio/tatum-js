/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaMintedResult = {
    /**
     * Transaction ID
     */
    txId?: string;
    /**
     * Address of the minted NFT contract
     */
    nftAddress?: string;
    /**
     * Address of the account owned by a mint recipient, which holds the minted NFT
     */
    nftAccountAddress?: string;
}
