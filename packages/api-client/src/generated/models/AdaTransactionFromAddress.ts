/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BtcTransactionFromAddress } from './BtcTransactionFromAddress';
import type { FeeAndChange } from './FeeAndChange';

export type AdaTransactionFromAddress = (FeeAndChange & BtcTransactionFromAddress);
