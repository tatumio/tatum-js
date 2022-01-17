/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNft = {
    /**
     * Chain to work with.
     */
    chain: MintNft.chain;
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
    contractAddress?: string;
    /**
     * Address of custom ERC20 token
     */
    erc20?: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * List of addresses, where royalty cashback for every transfer of this NFT will be send. Royalties are paid in native blockchain currency, like BSC or ETH.
     */
    authorAddresses?: Array<string>;
    /**
     * List of values, which will be paid as a royalty for author of the NFT token with every token transfer. This is exact value in native blockhain currency and percentage value in case of provenance
     */
    cashbackValues?: Array<string>;
    /**
     * List of fixed values, if fixed value is greater than cashback value, it will be transferred to the authors instead.This is exact value in native blockhain currency.
     */
    fixedValues?: Array<string>;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}

export namespace MintNft {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        MATIC = 'MATIC',
        KCS = 'KCS',
        ONE = 'ONE',
        BSC = 'BSC',
    }


}
