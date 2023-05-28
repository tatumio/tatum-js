/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FreezeTron = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Resource to obtain, BANDWIDTH or ENERGY.
     */
    resource: 'BANDWIDTH' | 'ENERGY';
    /**
     * Amount to be frozen in TRX.
     */
    amount: string;
}
