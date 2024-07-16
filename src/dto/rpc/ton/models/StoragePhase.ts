/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccStatusChange } from './AccStatusChange';

export type StoragePhase = {
    fees_collected: number;
    fees_due?: number;
    status_change: AccStatusChange;
};
