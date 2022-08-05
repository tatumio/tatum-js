/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaNftMetadataCreator = {
    /**
     * Address of the creator.
     */
    address: string;
    /**
     * If the creator was verified. Verified creator can be only that address, which private key was used during the minting of the NFT. If you are minting via NFT Express, your custom creators must be set to false.
     */
    verified: boolean;
    /**
     * How much percent should be sent to this creator.
     */
    share: number;
}
