/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRecordQuorum = {
    /**
     * Log data to be stored on a blockchain.
     */
    data: string;
    /**
     * Blockchain, where to store log data.
     */
    chain: 'QUORUM';
    /**
     * Blockchain address to store log on from.
     */
    from: string;
    /**
     * Blockchain address to store log on. If not defined, it will be stored on an address, from which the transaction was being made.
     */
    to: string;
}
