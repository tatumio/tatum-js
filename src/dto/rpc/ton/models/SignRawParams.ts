/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SignRawMessage } from './SignRawMessage';

export type SignRawParams = {
    relay_address: string;
    /**
     * Commission for the transaction. In nanocoins.
     */
    commission: string;
    from: string;
    valid_until: number;
    messages: Array<SignRawMessage>;
};
