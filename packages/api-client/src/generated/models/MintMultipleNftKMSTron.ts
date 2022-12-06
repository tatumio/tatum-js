/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftKMSTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * Blockchain address to perform transaction from
     */
    account: string;
    /**
     * ID of token to be created.
     */
    tokenId: Array<string>;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: Array<string>;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX)
     */
    feeLimit: number;
}
