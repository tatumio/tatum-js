/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaMarketplaceTransactionHash = {
    /**
     * The hash (ID) of the transaction
     */
    txId: string;
    /**
     * The address of deployed marketplace contract
     */
    contractAddress: string;
    /**
     * The blockchain address of the fee account
     */
    feeAccount: string;
    /**
     * The blockchain address of the treasury account
     */
    treasuryAccount: string;
}
