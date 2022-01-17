/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateAuctionCeloKMS = {
    /**
     * Blockchain to work with.
     */
    chain: GenerateAuctionCeloKMS.chain;
    /**
     * Address of the recipient of the fee for the trade.
     */
    feeRecipient: string;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: GenerateAuctionCeloKMS.feeCurrency;
    /**
     * Percentage of the selling amount of the NFT asset. 100 - 1%
     */
    auctionFee: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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

export namespace GenerateAuctionCeloKMS {

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
