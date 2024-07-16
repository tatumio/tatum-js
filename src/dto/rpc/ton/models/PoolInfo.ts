/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PoolImplementationType } from './PoolImplementationType';

export type PoolInfo = {
    address: string;
    name: string;
    total_amount: number;
    implementation: PoolImplementationType;
    /**
     * APY in percent
     */
    apy: number;
    min_stake: number;
    /**
     * current nomination cycle beginning timestamp
     */
    cycle_start: number;
    /**
     * current nomination cycle ending timestamp
     */
    cycle_end: number;
    /**
     * this pool has verified source code or managed by trusted company
     */
    verified: boolean;
    /**
     * current number of nominators
     */
    current_nominators: number;
    /**
     * maximum number of nominators
     */
    max_nominators: number;
    /**
     * for liquid staking master account of jetton
     */
    liquid_jetton_master?: string;
    /**
     * total stake of all nominators
     */
    nominators_stake: number;
    /**
     * stake of validator
     */
    validator_stake: number;
    cycle_length?: number;
};
