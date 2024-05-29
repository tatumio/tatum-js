/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployErc20 = {
    /**
     * Symbol of the ERC20 token
     */
    symbol: string;
    /**
     * Name of the ERC20 token
     */
    name: string;
    /**
     * Initial supply of ERC20 token. If totalCap is not defined, this supply is max supply.
     */
    supply: string;
    /**
     * Max supply of ERC20 token.
     */
    totalCap?: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * Address on Ethereum blockchain, where all created ERC20 tokens will be transferred.
     */
    address: string;
    /**
     * Private key of Ethereum account address, from which the fee for the deployment of ERC20 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
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
