/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftTron = {
    /**
     * Chain to work with.
     */
    chain: MintNftTron.chain;
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
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * List of addresses, where royalty cashback for every transfer of this NFT will be send. Royalties are paid in native blockchain currency TRON.
     */
    authorAddresses?: Array<string>;
    /**
     * List of values, which will be paid as a royalty for author of the NFT token with every token transfer. This is exact value in native blockhain currency.
     */
    cashbackValues?: Array<string>;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Max limit for fee to be paid, in TRX.
     */
    feeLimit: number;
}

export namespace MintNftTron {

    /**
     * Chain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
