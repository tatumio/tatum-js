/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FungibleInfo = {
    /**
     * The symbol of the fungible token.
     */
    symbol?: string;
    /**
     * The full name of the fungible token.
     */
    name?: string;
    /**
     * The total supply of the fungible token.
     */
    supply?: string;
    /**
     * The number of decimal places for the fungible token.
     */
    decimals?: number;
    /**
     * The type of the token (e.g., ERC20, BEP20).
     */
    tokenType?: string;
    /**
     * The maximum supply cap of the fungible token.
     */
    cap?: string;
}
