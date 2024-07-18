/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SizeLimitsConfig = {
    max_msg_bits: number;
    max_msg_cells: number;
    max_library_cells: number;
    max_vm_data_depth: number;
    max_ext_msg_size: number;
    max_ext_msg_depth: number;
    max_acc_state_cells?: number;
    max_acc_state_bits?: number;
};
