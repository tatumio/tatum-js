/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftExpressMetadata } from './SolanaNftExpressMetadata';

export type MintNftExpressSolana = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    metadata: SolanaNftExpressMetadata;
}
