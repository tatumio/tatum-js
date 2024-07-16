/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';
import type { JettonMetadata } from './JettonMetadata';
import type { JettonVerificationType } from './JettonVerificationType';

export type JettonInfo = {
    mintable: boolean;
    total_supply: string;
    admin?: AccountAddress;
    metadata: JettonMetadata;
    verification: JettonVerificationType;
    holders_count: number;
};
