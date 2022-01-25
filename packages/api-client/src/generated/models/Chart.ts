/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 1 point in the chart. This point represents the tick in the grapch based on the specified time frame.
 */
export type Chart = {
    /**
     * Milliseconds in UTC of the time interval.
     */
    timestamp: number;
    /**
     * Highest trade value in the current interval.
     */
    high: string;
    /**
     * Lowest trade value in the current interval.
     */
    low: string;
    /**
     * Open trade value in the current interval.
     */
    open: string;
    /**
     * Close trade value in the current interval.
     */
    close: string;
    /**
     * Total volume of assets traded in the current interval. Volume is in currency1 asset.
     */
    volume: string;
}
