/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountStorageInfo = {
    used_cells: number;
    used_bits: number;
    used_public_cells: number;
    /**
     * time of the last payment
     */
    last_paid: number;
    due_payment: number;
};
