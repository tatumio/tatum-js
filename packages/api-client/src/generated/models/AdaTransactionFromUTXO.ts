/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BtcTransactionFromUTXO } from './BtcTransactionFromUTXO';
import type { FeeAndChange } from './FeeAndChange';

export type AdaTransactionFromUTXO = (FeeAndChange & BtcTransactionFromUTXO);
