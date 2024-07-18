/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JettonBridgePrices } from './JettonBridgePrices';
import type { Oracle } from './Oracle';

export type JettonBridgeParams = {
    bridge_address: string;
    oracles_address: string;
    state_flags: number;
    burn_bridge_fee?: number;
    oracles: Array<Oracle>;
    external_chain_address?: string;
    prices?: JettonBridgePrices;
};
