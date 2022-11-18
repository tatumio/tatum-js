/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeployAlgoErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Symbol of the ERC20 token
     */
    symbol: string;
    /**
     * Name of the ERC20 token
     */
    name: string;
    /**
     * Initial supply of ERC20 token. If totalCap is not defined, this will be the total cap.
     */
    supply: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * The URL pointing to the metadata
     */
    url?: string;
    /**
     * Private key of Ethereum account address, from which the fee for the deployment of ERC20 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
