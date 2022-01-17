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
    timeFrame: ChartRequest.timeFrame;
}

export namespace ChartRequest {

    /**
     * Time frame of the chart.
     */
    export enum timeFrame {
        MIN_1 = 'MIN_1',
        MIN_3 = 'MIN_3',
        MIN_5 = 'MIN_5',
        MIN_15 = 'MIN_15',
        MIN_30 = 'MIN_30',
        HOUR_1 = 'HOUR_1',
        HOUR_4 = 'HOUR_4',
        HOUR_12 = 'HOUR_12',
        DAY = 'DAY',
        WEEK = 'WEEK',
        MONTH = 'MONTH',
        YEAR = 'YEAR',
    }


}
