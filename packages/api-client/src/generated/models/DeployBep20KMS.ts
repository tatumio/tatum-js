/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployBep20KMS = {
    /**
     * Symbol of the ERC20 token
     */
    symbol: string;
    /**
     * Name of the ERC20 token
     */
    name: string;
    /**
     * Max supply of ERC20 token.
     */
    totalCap?: string;
    /**
     * Max supply of ERC20 token.
     */
    supply: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * Address on Kcs blockchain, where all created ERC20 tokens will be transferred.
     */
    address: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to Kcs transaction. If not present, last known nonce will be used.
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
