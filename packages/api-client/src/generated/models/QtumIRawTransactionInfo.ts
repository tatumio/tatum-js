/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type QtumIRawTransactionInfo = {
    /**
     * transaction hash
     */
    txid?: string;
    /**
     * version number
     */
    version?: number;
    /**
     * locktime
     */
    locktime?: number;
    /**
     * transaction receipts
     */
    receipt?: Array<any>;
    vin?: Array<any>;
    vout?: Array<any>;
    /**
     * number of confirmations
     */
    confirmations?: number;
    /**
     * time of txn
     */
    time?: number;
    /**
     * out value
     */
    valueOut?: number;
    /**
     * in value
     */
    valueIn?: number;
    /**
     * txn fees
     */
    fees?: number;
    /**
     * block hash
     */
    blockhash?: string;
    /**
     * block height
     */
    blockheight?: number;
    /**
     * is qrc20 transfer?
     */
    isqrc20Transfer?: boolean;
}
