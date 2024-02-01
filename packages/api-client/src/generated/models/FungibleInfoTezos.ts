/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FungibleInfoTezos = {
    /**
     * The symbol of the fungible token.
     */
    symbol?: string;
    /**
     * The full name of the fungible token.
     */
    name?: string;
    /**
     * The describtion of the fungible token.
     */
    description?: string;
    /**
     * The total supply of the fungible token.
     */
    supply?: string;
    /**
     * The number of decimal places for the fungible token.
     */
    decimals?: number;
    /**
     * The type of the token (e.g., fungible, nft).
     */
    tokenType?: string;
}
