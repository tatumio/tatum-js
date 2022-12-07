/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftFlowMnemonic = {
    /**
     * Chain to work with.
     */
    chain: 'FLOW';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: Array<string>;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Mnemonic to generate private key of sender address.
     */
    mnemonic: string;
    /**
     * Derivation index of sender address.
     */
    index: number;
}
