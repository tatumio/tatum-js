/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Raw data associated with the event, including topics and data.
 */
export type RawData = {
    /**
     * The first topic of the event, if present.
     */
    topic_0: string;
    /**
     * The second topic of the event, if present.
     */
    topic_1?: string;
    /**
     * The third topic of the event, if present.
     */
    topic_2?: string;
    /**
     * The fourth topic of the event, if present.
     */
    topic_3?: string;
    /**
     * The data associated with the event, if present.
     */
    data?: string;
}
