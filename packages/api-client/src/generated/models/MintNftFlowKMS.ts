/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftFlowKMS = {
    /**
     * Chain to work with.
     */
    chain: 'FLOW';
    /**
     * Blockchain address to send NFT token to.
     */
    to: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Derivation index of sender address.
     */
    index?: number;
}
