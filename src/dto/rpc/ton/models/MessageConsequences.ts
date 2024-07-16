/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountEvent } from './AccountEvent';
import type { Risk } from './Risk';
import type { Trace } from './Trace';

export type MessageConsequences = {
    trace: Trace;
    risk: Risk;
    event: AccountEvent;
};
