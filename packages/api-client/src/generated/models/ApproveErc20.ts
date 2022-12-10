/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApproveErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'BSC' | 'MATIC' | 'KLAY' | 'ONE';
    /**
     * The address of the smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address to be allowed to transfer or burn the fungible tokens
     */
    spender: string;
    /**
     * The amount of the tokens allowed to be transferred or burnt
     */
    amount: string;
    /**
     * The private key of the smart contract's owner; the fee will be deducted from the owner's address
     */
    fromPrivateKey: string;
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
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
