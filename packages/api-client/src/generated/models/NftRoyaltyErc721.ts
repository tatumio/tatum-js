/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NftRoyaltyErc721 = {
    /**
     * The blockchain addresses where the royalty cashback will be sent every time the NFT is transferred
     */
    addresses?: Array<string>;
    /**
     * The amounts of the royalties that will be paid to the authors of the NFT every time the NFT is transferred; the royalties are paid as a percentage of the NFT price (on Solana) or in a native blockchain currency (on the other supported blockchains)
     *
     */
    values?: Array<string>;
}
