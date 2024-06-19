/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403AvalancheBroadcast = {
    /**
     * avalanche.broadcast.failed
     */
    errorCode: string;
    /**
     * Unable to broadcast transaction due to ${error}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}