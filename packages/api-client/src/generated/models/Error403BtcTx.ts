/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BtcTx = {
    /**
     * transaction.invalid.body
     */
    errorCode: string;
    /**
     * Either UTXO, or addresses must be present.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
