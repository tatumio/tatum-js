/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FreezeTron = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of frozen BANDWIDTH or ENERGY.
     */
    receiver: string;
    /**
     * Duration of frozen funds, in days<br/>Set this parameter to 3.
     */
    duration: number;
    /**
     * Resource to obtain, BANDWIDTH or ENERGY.
     */
    resource: 'BANDWIDTH' | 'ENERGY';
    /**
     * Amount to be frozen in TRX.
     */
    amount: string;
}
