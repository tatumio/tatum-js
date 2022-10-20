/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvalidGasPumpAddress } from './InvalidGasPumpAddress';
import type { ValidGasPumpAddress } from './ValidGasPumpAddress';

export type GasPumpTrxOut = {
    /**
     * Activated gas pump addresses
     */
    valid?: Array<ValidGasPumpAddress>;
    /**
     * Not activated gas pump addresses
     */
    invalid?: Array<InvalidGasPumpAddress>;
}
