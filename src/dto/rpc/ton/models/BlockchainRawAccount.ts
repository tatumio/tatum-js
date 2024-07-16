/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountStatus } from './AccountStatus';
import type { AccountStorageInfo } from './AccountStorageInfo';

export type BlockchainRawAccount = {
    address: string;
    balance: number;
    extra_balance?: Record<string, string>;
    code?: string;
    data?: string;
    last_transaction_lt: number;
    last_transaction_hash?: string;
    frozen_hash?: string;
    status: AccountStatus;
    storage: AccountStorageInfo;
    libraries?: Array<{
        public: boolean;
        root: string;
    }>;
};
