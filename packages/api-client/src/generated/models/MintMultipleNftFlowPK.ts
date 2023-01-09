/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftFlowPK = {
    /**
     * The blockchain to work with
     */
    chain: 'FLOW';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
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
     * Private key of sender address. Private key, mnemonic and index or signature Id must be present.
     */
    privateKey: string;
}
