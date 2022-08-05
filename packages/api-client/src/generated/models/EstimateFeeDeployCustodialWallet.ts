/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeDeployCustodialWallet = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'ONE' | 'MATIC' | 'KLAY';
    /**
     * Type of transaction
     */
    type: 'DEPLOY_CUSTODIAL_WALLET_BATCH';
    /**
     * Number of addresses to create
     */
    batchCount: number;
}
