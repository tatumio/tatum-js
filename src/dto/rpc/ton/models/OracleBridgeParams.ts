/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Oracle } from './Oracle';

export type OracleBridgeParams = {
    bridge_addr: string;
    oracle_multisig_address: string;
    external_chain_address: string;
    oracles: Array<Oracle>;
};
