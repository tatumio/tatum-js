/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCeloBlockchain = {
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
     */
    data?: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency of the transaction
     */
    currency: TransferCeloBlockchain.currency;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: TransferCeloBlockchain.feeCurrency;
    /**
     * Amount to be sent in Celoer.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}

export namespace TransferCeloBlockchain {

    /**
     * Currency of the transaction
     */
    export enum currency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
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
