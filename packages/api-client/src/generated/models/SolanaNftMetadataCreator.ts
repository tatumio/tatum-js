/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaNftMetadataCreator = {
    /**
     * The blockchain address of the NFT creator
     */
    address: string;
    /**
     * If set to <code>true</code>, the NFT creator was verified. Only the address whose private key was used during the minting of the NFT can be a verified creator. If you are minting the NFT using NFT Express, set this parameter to <code>false</code>.
     */
    verified: boolean;
    /**
     * The share to be sent to the NFT creator (in %)
     */
    share: number;
}
