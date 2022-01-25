/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowEvent = {
    blockID?: string;
    blockHeight?: number;
    blockTimestamp?: string;
    type?: string;
    transactionId?: string;
    transactionIndex?: number;
    eventIndex?: number;
    payload?: {
        /**
         * Type of payload.
         */
        type?: FlowEvent.type;
        value?: {
            /**
             * Event type
             */
            id?: string;
            fields?: Array<{
                /**
                 * Name of the property
                 */
                name?: string;
                value?: ({
                    /**
                     * Type of the value
                     */
                    type?: string;
                    /**
                     * Value
                     */
                    value?: string;
                } | {
                    /**
                     * Type of the value
                     */
                    type?: string;
                    value?: {
                        /**
                         * Type of the value
                         */
                        type?: string;
                        /**
                         * Value
                         */
                        value?: string;
                    };
                });
            }>;
        };
    };
}

export namespace FlowEvent {

    /**
     * Type of payload.
     */
    export enum type {
        EVENT = 'Event',
    }


}
