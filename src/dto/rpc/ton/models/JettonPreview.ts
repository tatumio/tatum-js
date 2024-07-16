/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JettonVerificationType } from './JettonVerificationType';

export type JettonPreview = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    image: string;
    verification: JettonVerificationType;
};
