/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronTrc10Detail = {
    /**
     * The address of the TRC-10 token's owner in the hexadecimal format
     */
    ownerAddress?: string;
    /**
     * The name of the TRC-10 token
     */
    name?: string;
    /**
     * The abbreviated name of the TRC-10 token
     */
    abbr?: string;
    /**
     * The description of the TRC-10 token
     */
    description?: string;
    /**
     * The URL of the TRC-10 token
     */
    url?: string;
    /**
     * The total supply of tokens in the TRC-10 token
     */
    totalSupply?: number;
    /**
     * The number of decimal places
     */
    precision?: number;
    /**
     * The ID of the TRC-10 token
     */
    id?: number;
}
