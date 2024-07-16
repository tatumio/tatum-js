/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { Action } from './Action';

/**
 * An event is built on top of a trace which is a series of transactions caused by one inbound message. TonAPI looks for known patterns inside the trace and splits the trace into actions, where a single action represents a meaningful high-level operation like a Jetton Transfer or an NFT Purchase. Actions are expected to be shown to users. It is advised not to build any logic on top of actions because actions can be changed at any time.
 */
export type AccountEvent = {
    event_id: string;
    account: AccountAddress;
    timestamp: number;
    actions: Array<Action>;
    /**
     * scam
     */
    is_scam: boolean;
    lt: number;
    /**
     * Event is not finished yet. Transactions still happening
     */
    in_progress: boolean;
    /**
     * TODO
     */
    extra: number;
};
