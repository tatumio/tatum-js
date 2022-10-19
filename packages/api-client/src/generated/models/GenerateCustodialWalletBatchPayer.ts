/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletBatchPayer = {
    /**
     * Blockchain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'BSC' | 'ONE' | 'CELO' | 'XDC';
    /**
     * If set to true, blockchain fees will be covered from credits.
     */
    feesCovered: boolean;
    /**
     * Number of addresses to generate.
     */
    batchCount: number;
    /**
     * Owner of the addresses.
     */
    owner: string;
}
