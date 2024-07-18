/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TvmStackRecord = {
    type: 'cell' | 'num' | 'nan' | 'null' | 'tuple';
    cell?: string;
    slice?: string;
    num?: string;
    tuple?: Array<TvmStackRecord>;
};
