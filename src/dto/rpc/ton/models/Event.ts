/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Action } from './Action';
import type { ValueFlow } from './ValueFlow';

export type Event = {
    event_id: string;
    timestamp: number;
    actions: Array<Action>;
    value_flow: Array<ValueFlow>;
    /**
     * scam
     */
    is_scam: boolean;
    lt: number;
    /**
     * Event is not finished yet. Transactions still happening
     */
    in_progress: boolean;
};
