/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

export type MintNftExpressSolana = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    metadata: SolanaNftMetadata;
}
