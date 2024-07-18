/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ValidatorsSet = {
    utime_since: number;
    utime_until: number;
    total: number;
    main: number;
    total_weight?: string;
    list: Array<{
        public_key: string;
        weight: number;
        adnl_addr?: string;
    }>;
};
