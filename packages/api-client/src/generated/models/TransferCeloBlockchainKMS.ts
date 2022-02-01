/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCeloBlockchainKMS = {
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
     */
    data?: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency of the transaction
     */
    currency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Amount to be sent in Celoer.
     */
    amount: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
