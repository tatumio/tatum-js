/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BroadcastResponse = {
    /**
     * Flag, if withdrawal is successfully completed within Tatum systems.
     */
    completed?: boolean;
    /**
     * Transaction ID of broadcast transaction and status
     */
    txId?: string;
}
