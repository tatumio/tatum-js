/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BcashBroadcast = {
    /**
     * bch.broadcast.failed
     */
    errorCode: string;
    /**
     * Unable to broadcast transaction. Error from blockchain: ${error}
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
