/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403SonicMnemonicPrivateKey = {
    /**
     * private.mnemonic.missing
     */
    errorCode: string;
    /**
     * Either mnemonic and index or private key must be present.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
