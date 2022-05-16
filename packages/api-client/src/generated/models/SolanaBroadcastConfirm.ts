/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaBroadcastConfirm = {
    /**
     * Raw signed transaction to be published to network.
     */
    txData: string;
    /**
     * Options for sending and waiting for a transaction
     */
    options?: {
        /**
         * Commitment to waiting for transaction confirmation
         */
        commitment?: 'confirmed' | 'finalized';
        /**
         * Preflight Commitment.
         */
        preflightCommitment?: 'confirmed' | 'finalized' | 'processed' | 'recent' | 'single' | 'singleGossip' | 'max';
    };
}
