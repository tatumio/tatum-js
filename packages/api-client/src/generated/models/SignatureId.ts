/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignatureId = {
    /**
     * The internal Tatum ID of the prepared transaction for Key Management Sysytem (KMS) to sign<br/>This is different from the <code>signatureId</code> parameter that you provided in the request body. The <code>signatureId</code> parameter in the request body specifies the signature ID associated with the private key in KMS.
     */
    signatureId: string;
}
