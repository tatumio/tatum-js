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
     * Fee Account Address
     */
    feeAccount: string;
    /**
     * Treasury Account Address
     */
    treasuryAccount: string;
}
