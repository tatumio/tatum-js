/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type MintMultipleNftKMSCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * ID of token to be created.
     */
    tokenId: Array<string>;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: Array<string>;
    /**
     * List of addresses for every token, where royalty cashback for every transfer of this NFT will be send. Royalties are paid in native blockchain currency CELO.
     */
    authorAddresses?: Array<Array<string>>;
    /**
     * List of values for every token, which will be paid as a royalty for author of the NFT token with every token transfer. This is exact value in native blockchain currency.
     */
    cashbackValues?: Array<Array<string>>;
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
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
}
