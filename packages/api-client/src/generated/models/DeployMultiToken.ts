/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployMultiToken = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'ONE' | 'MATIC' | 'KCS' | 'KLAY' | 'BSC' | 'FLR' | 'CRO';
    /**
     * URI of the Multi Token token
     */
    uri: string;
    /**
     * Private key of account address, from which gas for deployment of ERC1155 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * True if the contract is publicMint type
     */
    publicMint?: boolean;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
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
