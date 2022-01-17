/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronInternalTx = {
    /**
     * Transaction ID.
     */
    tx_id: string;
    /**
     * Internal TX ID.
     */
    internal_tx_id: string;
    /**
     * Recipient address.
     */
    to_address: string;
    /**
     * Sender address.
     */
    from_address: string;
}
