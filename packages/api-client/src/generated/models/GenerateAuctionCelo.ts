/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateAuctionCelo = {
    /**
     * Blockchain to work with.
     */
    chain: GenerateAuctionCelo.chain;
    /**
     * Address of the recipient of the fee for the trade.
     */
    feeRecipient: string;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: GenerateAuctionCelo.feeCurrency;
    /**
     * Percentage of the selling amount of the NFT asset. 100 - 1%
     */
    auctionFee: number;
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

export namespace GenerateAuctionCelo {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        CELO = 'CELO',
    }

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
