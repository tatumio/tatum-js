/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

/**
 * <p>The <code>MintNft</code> schema lets you mint NFTs natively on BNB Smart Chain, Ethereum, Harmony, Klaytn, KuCoin Community Chain, Polygon and Horizen Eon and sign the transaction with your private key.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNft = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'KLAY' | 'KCS' | 'MATIC' | 'ONE' | 'ZEN' | 'FLR' | 'CRO' | 'BASE' | 'AVAX';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
    /**
     * The private key of the blockchain address that will pay the fee for the transaction
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
