/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { AccountStatus } from './AccountStatus';
import type { ActionPhase } from './ActionPhase';
import type { BouncePhaseType } from './BouncePhaseType';
import type { ComputePhase } from './ComputePhase';
import type { CreditPhase } from './CreditPhase';
import type { Message } from './Message';
import type { StoragePhase } from './StoragePhase';
import type { TransactionType } from './TransactionType';

export type Transaction = {
    hash: string;
    lt: number;
    account: AccountAddress;
    success: boolean;
    utime: number;
    orig_status: AccountStatus;
    end_status: AccountStatus;
    total_fees: number;
    end_balance: number;
    transaction_type: TransactionType;
    state_update_old: string;
    state_update_new: string;
    in_msg?: Message;
    out_msgs: Array<Message>;
    block: string;
    prev_trans_hash?: string;
    prev_trans_lt?: number;
    compute_phase?: ComputePhase;
    storage_phase?: StoragePhase;
    credit_phase?: CreditPhase;
    action_phase?: ActionPhase;
    bounce_phase?: BouncePhaseType;
    aborted: boolean;
    destroyed: boolean;
    /**
     * hex encoded boc with raw transaction
     */
    raw: string;
};
