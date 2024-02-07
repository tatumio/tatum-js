/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcBasedBalance = {
    /**
     * Total sum of the assets that arrives to the address. Both confirmed transactions in the block and pending in the mempool are used for calculating this value.
     */
    incoming?: string;
    /**
     * Total sum of the assets that leaves from the address. Both confirmed transactions in the block and pending in the mempool are used for calculating this value.
     */
    outgoing?: string;
    /**
     * Total sum of the assets that arrives to the address and are pending in the mempool.
     */
    incomingPending?: string;
    /**
     * Total sum of the assets that leaves from the address and are pending in the mempool.
     */
    outgoingPending?: string;
}
