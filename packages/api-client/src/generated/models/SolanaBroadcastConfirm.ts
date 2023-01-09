/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaBroadcastConfirmOptions } from './SolanaBroadcastConfirmOptions';

export type SolanaBroadcastConfirm = {
    /**
     * Raw signed transaction to be published to network.
     */
    txData: string;
    options?: SolanaBroadcastConfirmOptions;
}
