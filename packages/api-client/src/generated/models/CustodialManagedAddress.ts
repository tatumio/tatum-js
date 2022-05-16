/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CustodialManagedAddress = {
    /**
     * Blockchain address
     */
    address: string;
    /**
     * Unique identifier of the managed address
     */
    walletId: string;
    /**
     * Blockchain of the address
     */
    chain: 'BSC' | 'ETH' | 'KLAY' | 'ONE' | 'CELO' | 'MATIC' | 'SOL' | 'LTC' | 'BTC';
    /**
     * Private key of the address. Not present by default.
     */
    privateKey?: string;
}
