/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronTrc10Detail = {
    /**
     * Address of the owner of the token, in hex.
     */
    ownerAddress?: string;
    /**
     * Name of the token.
     */
    name?: string;
    /**
     * Abbreviation of the token.
     */
    abbr?: string;
    /**
     * Description of the token.
     */
    description?: string;
    /**
     * URL of the token.
     */
    url?: string;
    /**
     * Total supply of the tokens.
     */
    totalSupply?: number;
    /**
     * Number of decimal places of the token.
     */
    precision?: number;
}
