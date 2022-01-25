/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateCashbackValueForAuthorNft = {
    /**
     * Chain to work with.
     */
    chain: UpdateCashbackValueForAuthorNft.chain;
    /**
     * ID of token to be updated.
     */
    tokenId: string;
    /**
     * New royalty cashback to be set for the author of token with tokenId. If set to 0, royalty is disabled for this token.
     */
    cashbackValue: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
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

export namespace UpdateCashbackValueForAuthorNft {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        MATIC = 'MATIC',
        KCS = 'KCS',
        ONE = 'ONE',
        BSC = 'BSC',
    }


}
