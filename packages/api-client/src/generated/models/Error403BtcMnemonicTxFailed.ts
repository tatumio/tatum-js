/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BtcMnemonicTxFailed = {
    /**
     * transaction.preparation.failed
     */
    errorCode: string;
    /**
     * Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
