/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChartRequest = {
    /**
     * Trading pair
     */
    pair: string;
    /**
     * Start interval in UTC millis.
     */
    from: number;
    /**
     * End interval in UTC millis.
     */
    to: number;
    /**
     * Time frame of the chart.
     */
    timeFrame: 'MIN_1' | 'MIN_3' | 'MIN_5' | 'MIN_15' | 'MIN_30' | 'HOUR_1' | 'HOUR_4' | 'HOUR_12' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
}
