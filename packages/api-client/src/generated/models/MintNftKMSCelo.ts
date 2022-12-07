/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftKMSCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * ID of token to be created.
     */
    tokenId: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Address of custom ERC20 token
     */
    erc20?: any;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * List of addresses, where royalty cashback for every transfer of this NFT will be send. Royalties are paid in native blockchain currency CELO.
     */
    authorAddresses?: Array<string>;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * List of values, which will be paid as a royalty for author of the NFT token with every token transfer. This is exact value in native blockhain currency and percentage value in case of provenance
     */
    cashbackValues?: Array<string>;
    /**
     * List of fixed values, if fixed value is greater than cashback value, it will be transferred to the authors instead.This is exact value in native blockhain currency.
     */
    fixedValues?: Array<string>;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
