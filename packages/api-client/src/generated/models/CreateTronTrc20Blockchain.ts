/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTronTrc20Blockchain = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of created TRC20 tokens.
     */
    recipient: string;
    /**
     * Name of the token.
     */
    name: string;
    /**
     * Symbol of the token.
     */
    symbol: string;
    /**
     * Total supply of the tokens.
     */
    totalSupply: number;
    /**
     * Number of decimal places of the token.
     */
    decimals: number;
}
