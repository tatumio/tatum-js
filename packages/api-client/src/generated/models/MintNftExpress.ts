/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftExpress = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'CELO' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
}
