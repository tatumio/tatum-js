/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VetTxReceipt = {
    gasUsed?: number;
    gasPayer?: string;
    paid?: string;
    reward?: string;
    reverted?: boolean;
    meta?: {
        blockID?: string;
        blockNumber?: number;
        blockTimestamp?: number;
        txID?: string;
        txOrigin?: string;
    };
    /**
     * List of recipient addresses and amounts to send to each of them.
     */
    outputs?: Array<{
        events?: Array<any>;
        transfers?: Array<{
            sender?: string;
            recipient?: string;
            amount?: string;
        }>;
    }>;
    blockNumber?: number;
    blockHash?: string;
    transactionHash?: string;
    status?: string;
}
