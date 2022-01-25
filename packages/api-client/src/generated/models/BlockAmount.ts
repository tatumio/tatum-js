/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BlockAmount = {
    /**
     * Amount to be blocked on account.
     */
    amount: string;
    /**
     * Type of blockage.
     */
    type: string;
    /**
     * Description of blockage.
     */
    description?: string;
}
