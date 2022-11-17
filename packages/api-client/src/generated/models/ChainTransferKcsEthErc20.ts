/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferKcsEthErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'KCS';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address of the fungible token smart contract
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have
     */
    digits: number;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The custom defined fee; if not present, will be calculated automatically
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
