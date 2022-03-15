/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TerraTx } from './TerraTx';

export type TerraBlock = {
    hash?: string;
    height?: number;
    timestamp?: string;
    txs?: Array<TerraTx>;
}
