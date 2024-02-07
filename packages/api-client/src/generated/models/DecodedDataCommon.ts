/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Common properties for decoded data events.
 */
export type DecodedDataCommon = {
    /**
     * The label of the event.
     */
    label?: string;
    /**
     * The type of the event.
     */
    type?: string;
    /**
     * The subtype of the event.
     */
    subtype?: string;
    /**
     * The sender address of the event.
     */
    from?: string;
    /**
     * The receiver address of the event.
     */
    to?: string;
}
