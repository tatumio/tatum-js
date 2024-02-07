/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FreezeTronKMS = {
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Resource to obtain, BANDWIDTH or ENERGY.
     */
    resource: 'BANDWIDTH' | 'ENERGY';
    /**
     * Amount to be frozen in TRX.
     */
    amount: string;
}
