/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataKMS } from './SolanaNftMetadataKMS';

export type MintNftSolanaKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The blockchain address to mint the NFT from. The transaction fee will be paid from this address.
     */
    from: string;
    /**
     * The KMS identifier of the private key of the sender's address
     */
    signatureId: string;
    metadata: SolanaNftMetadataKMS;
}
