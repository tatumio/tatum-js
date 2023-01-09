/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaTxMessage } from './SolanaTxMessage';

export type SolanaTxTransaction = {
    message?: SolanaTxMessage;
    signatures?: Array<string>;
}
