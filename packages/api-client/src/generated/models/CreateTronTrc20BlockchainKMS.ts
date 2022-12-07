/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTronTrc20BlockchainKMS = {
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index: number;
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
