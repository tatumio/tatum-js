/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderBookSort } from './OrderBookSort';

export type ListOderBookHistoryBody = {
    /**
     * Account ID. If present, only closed trades for given account will be present.
     */
    id?: string;
    /**
     * Customer ID. If present, only closed trades for given customer will be present.
     */
    customerId?: string;
    /**
     * Max number of items per page is 50.
     */
    pageSize: number;
    /**
     * Offset to obtain next page of the data.
     */
    offset?: number;
    /**
     * Trade pair. If present, list historical trades for that pair.
     */
    pair?: string;
    /**
     * Get the total trade pair count based on the filter. Either count or pageSize is accepted.
     */
    count?: boolean;
    /**
     * Trade types.
     */
    types?: Array<'FUTURE_BUY' | 'FUTURE_SELL' | 'BUY' | 'SELL'>;
    /**
     * Amount of the trade. AND is used between filter options.
     */
    amount?: Array<{
        /**
         * Filtering operation.
         */
        op: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';
        /**
         * Value of the operation.
         */
        value: string;
    }>;
    /**
     * Fill of the trade. AND is used between filter options.
     */
    fill?: Array<{
        /**
         * Filtering operation.
         */
        op: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';
        /**
         * Value of the operation.
         */
        value: string;
    }>;
    /**
     * Price of the trade. AND is used between filter options.
     */
    price?: Array<{
        /**
         * Filtering operation.
         */
        op: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';
        /**
         * Value of the operation.
         */
        value: string;
    }>;
    /**
     * Created date of the trade. AND is used between filter options.
     */
    created?: Array<{
        /**
         * Filtering operation.
         */
        op: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';
        /**
         * Value of the operation.
         */
        value: string;
    }>;
    sort?: OrderBookSort;
}
