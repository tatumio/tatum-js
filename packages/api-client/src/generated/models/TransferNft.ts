/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNft = {
    /**
     * If token to be transferred is Royalty NFT token, this is a value to be paid as a cashback to the authors of the token.
     */
    value?: string;
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * ID of token.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * data you want to store with transaction, optional and valid only if provenance contract
     */
    provenanceData?: string;
    /**
     * current price of the token, valid only for provenance
     */
    tokenPrice?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
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
