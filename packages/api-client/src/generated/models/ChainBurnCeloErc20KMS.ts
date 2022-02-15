/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainBurnCeloErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Amount of tokens to be destroyed.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
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
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
