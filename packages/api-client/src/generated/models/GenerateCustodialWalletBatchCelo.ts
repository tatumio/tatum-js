/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletBatchCelo = {
    /**
     * Blockchain to work with.
     */
    chain: GenerateCustodialWalletBatchCelo.chain;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: GenerateCustodialWalletBatchCelo.feeCurrency;
    /**
     * Private key of account, from which the transaction will be initiated.
     */
    fromPrivateKey: string;
    /**
     * Number of addresses to generate.
     */
    batchCount: number;
    /**
     * Owner of the addresses.
     */
    owner: string;
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
     * Nonce to be set to the transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}

export namespace GenerateCustodialWalletBatchCelo {

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
