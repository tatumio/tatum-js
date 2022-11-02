/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftExpressMetadata } from './SolanaNftExpressMetadata';

/**
 * <p>The <code>MintNftExpressSolana</code> schema lets you mint NFTs on Solana using <b>NTF Express</b> with the pre-built smart contract provided by Tatum.<br/>For more information, see "Use the pre-built smart contract provided by Tatum to mint NFTs" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftExpressSolana = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    metadata: SolanaNftExpressMetadata;
}
