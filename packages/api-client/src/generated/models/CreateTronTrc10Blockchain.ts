/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTronTrc10Blockchain = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of created TRC 10 tokens.
     */
    recipient: string;
    /**
     * Name of the token.
     */
    name: string;
    /**
     * Abbreviation of the token.
     */
    abbreviation: string;
    /**
     * Description of the token.
     */
    description: string;
    /**
     * URL of the token.
     */
    url: string;
    /**
     * Total supply of the tokens.
     */
    totalSupply: number;
    /**
     * Number of decimal places of the token.
     */
    decimals: number;
}
