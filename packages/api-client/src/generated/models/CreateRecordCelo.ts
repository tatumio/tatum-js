/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRecordCelo = {
    /**
     * The data to be stored on the blockchain
     */
    data: string;
    /**
     * The blockchain to store the data on
     */
    chain: 'CELO';
    /**
     * The private key of the blockchain address from which the transaction will be made and the transaction fee will be deducted
     */
    fromPrivateKey: string;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.
     */
    to?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
