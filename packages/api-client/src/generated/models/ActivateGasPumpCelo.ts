/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ActivateGasPumpCelo = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The blockchain address that owns the precalculated gas pump addresses and is used to pay gas fees for operations made on the gas pump addresses; can be referred to as "master address"
     */
    owner: string;
    /**
     * The start index of the range of gas pump addresses to activate
     */
    from: number;
    /**
     * The end index of the range of gas pump addresses to activate; must be greater than or equal to the value in the <code>from</code> parameter
     */
    to: number;
    /**
     * The currency in which the gas fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The private key of the blockchain address that will pay the gas fee for the activation transaction
     */
    fromPrivateKey: string;
}
