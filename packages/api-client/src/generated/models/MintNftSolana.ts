/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

export type MintNftSolana = {
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
     * Private key of sender address.
     */
    fromPrivateKey: string;
    metadata: SolanaNftMetadata;
}
