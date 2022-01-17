/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BtcUTXO = {
    /**
     * tx.hash.index.spent
     */
    errorCode: string;
    /**
     * No such UTXO for transaction and index.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
