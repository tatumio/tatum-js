/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRecordFabric = {
    /**
     * Log data to be stored on a blockchain.
     */
    data: string;
    /**
     * Blockchain, where to store log data.
     */
    chain: 'FABRIC';
    /**
     * Key, under which the data will be stored.
     */
    key: string;
}
