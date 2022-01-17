/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderBookSort } from './OrderBookSort';

export type ListOderBookActiveSellBody = {
    /**
     * Account ID. If present, list current active sell trades for that account.
     */
    id?: string;
    /**
     * Customer ID. If present, list current active buy trades for that customer.
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
     * Trade pair. If present, list current active sell trades for that pair.
     */
    pair?: string;
    /**
     * Get the total trade pair count based on the filter. Either count or pageSize is accepted.
     */
    count?: boolean;
    /**
     * Trade type.
     */
    tradeType?: ListOderBookActiveSellBody.tradeType;
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

export namespace ListOderBookActiveSellBody {

    /**
     * Trade type.
     */
    export enum tradeType {
        FUTURE_SELL = 'FUTURE_SELL',
        SELL = 'SELL',
    }


}
