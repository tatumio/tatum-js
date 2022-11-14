/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataKMS } from './SolanaNftMetadataKMS';

/**
 * <p>The <code>MintNftSolanaKMS</code> schema lets you mint NFTs natively on Solana and sign the transaction with your signature ID.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
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
     * The blockchain address that will pay the fee for the transaction
     */
    from: string;
    /**
     * The KMS identifier of the private key of the blockchain address that will pay the fee for the transaction
     */
    signatureId: string;
    /**
     * Address on the Solana blockchain, from which the fee will be paid for transaction. Defaults to from.
     */
    feePayer?: string;
    /**
     * Identifier of the private key used for paying the gas costs in signing application. Defaults to the signatureId.
     */
    feePayerSignatureId?: string;
    metadata: SolanaNftMetadataKMS;
}
