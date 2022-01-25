/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BnbTxStateFailed = {
    /**
     * bnb.broadcast.failed.tx.state
     */
    errorCode: string;
    /**
     * Unable to broadcast BNB transaction, tx ${hash} state not OK.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
