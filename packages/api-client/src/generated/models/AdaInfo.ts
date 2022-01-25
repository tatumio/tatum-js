/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdaInfo = {
    /**
     * Chain of the blockchain, main or test.
     */
    testnet?: string;
    tip?: {
        /**
         * Last block.
         */
        number?: number;
        /**
         * Last slot number.
         */
        slotNo?: number;
        epoch?: {
            /**
             * Last epoch number.
             */
            number?: number;
        };
    };
}
