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
    chain: CreateRecordFabric.chain;
    /**
     * Key, under which the data will be stored.
     */
    key: string;
}

export namespace CreateRecordFabric {

    /**
     * Blockchain, where to store log data.
     */
    export enum chain {
        FABRIC = 'FABRIC',
    }


}
