/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

export type MintNftSolanaKMS = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Blockchain address to mint NFT token from. From this account, transaction fee will be paid.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    metadata: SolanaNftMetadata;
}
