/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateGasPump = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'MATIC' | 'KLAY' | 'TRON';
    /**
     * The blockchain address that will own the precalculated gas pump addresses and will be used to pay gas fees for operations made on the gas pump addresses; can be referred to as "master address"
     */
    owner: string;
    /**
     * The start index of the range of gas pump addresses to precalculate
     */
    from: number;
    /**
     * The end index of the range of gas pump addresses to precalculate; must be greater than or equal to the value in the <code>from</code> parameter
     */
    to: number;
}
