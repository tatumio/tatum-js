/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GasPumpAddress } from './GasPumpAddress';
import type { InvalidGasPumpAddress } from './InvalidGasPumpAddress';

export type GasPumpTrxOut = {
    /**
     * Activated gas pump addresses
     */
    valid?: Array<GasPumpAddress>;
    /**
     * Not activated gas pump addresses
     */
    invalid?: Array<InvalidGasPumpAddress>;
}
