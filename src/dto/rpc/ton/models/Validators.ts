/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Validator } from './Validator';

export type Validators = {
    elect_at: number;
    elect_close: number;
    min_stake: number;
    total_stake: number;
    validators: Array<Validator>;
};
