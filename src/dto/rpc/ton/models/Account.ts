/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountStatus } from './AccountStatus';

export type Account = {
    address: string;
    balance: number;
    /**
     * {'USD': 1, 'IDR': 1000}
     */
    currencies_balance?: any;
    /**
     * unix timestamp
     */
    last_activity: number;
    status: AccountStatus;
    interfaces?: Array<string>;
    name?: string;
    is_scam?: boolean;
    icon?: string;
    memo_required?: boolean;
    get_methods: Array<string>;
    is_suspended?: boolean;
    is_wallet: boolean;
};
