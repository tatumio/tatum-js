/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeployErc20 = {
    /**
     * Chain to work with.
     */
    chain: ChainDeployErc20.chain;
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
     * Initial supply of ERC20 token. If totalCap is not defined, this will be the total cap.
     */
    supply: string;
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
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
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

export namespace ChainDeployErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        BSC = 'BSC',
        MATIC = 'MATIC',
        XDC = 'XDC',
        ONE = 'ONE',
        ALGO = 'ALGO',
    }


}
