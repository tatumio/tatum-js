/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * The ID of the NFT to burn
     */
    tokenId: string;
    /**
     * The blockchain address of the NFT to burn
     */
    contractAddress: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the specific address from the mnemonic
     */
    index?: number;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * The nonce to be set to the transfer transaction; if not present, the last known nonce will be used
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
