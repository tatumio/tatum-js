/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ActivateGasPumpTatum = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'MATIC' | 'KLAY' | 'ONE';
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
     * Set to "true" to cover the gas fee by credits from your monthly credit allowance.
     */
    feesCovered: boolean;
}
