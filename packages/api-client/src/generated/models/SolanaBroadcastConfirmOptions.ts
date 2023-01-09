/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Options for sending and waiting for a transaction
 */
export type SolanaBroadcastConfirmOptions = {
    /**
     * Commitment to waiting for transaction confirmation
     */
    commitment?: 'confirmed' | 'finalized';
    /**
     * Preflight Commitment.
     */
    preflightCommitment?: 'confirmed' | 'finalized' | 'processed' | 'recent' | 'single' | 'singleGossip' | 'max';
}
