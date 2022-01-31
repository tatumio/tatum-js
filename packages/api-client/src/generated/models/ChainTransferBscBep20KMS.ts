/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferBscBep20KMS = {
    /**
     * Chain to work with.
     */
    chain: 'BSC';
    /**
     * Blockchain address to send BEP20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of BEP20 token
     */
    contractAddress: string;
    /**
     * Number of decimal points that BEP20 token has.
     */
    digits: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to BSC transaction. If not present, last known nonce will be used.
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
