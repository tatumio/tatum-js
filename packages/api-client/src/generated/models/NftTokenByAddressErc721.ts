/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftTokenByAddressErc721TokenMetadata } from './NftTokenByAddressErc721TokenMetadata';

export type NftTokenByAddressErc721 = {
    /**
     * On Algorand, this is the asset ID (the ID of the NFT); on the other blockchains, this is the address of the NFT smart contract
     */
    contractAddress: string;
    /**
     * On Algorand, an array of "1" to indicate that the NFTs with the specified IDs exist, or array with amount of fractions for <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>; on the other blockchains, this is an array of the IDs of the NFTs.
     */
    balances: Array<string>;
    /**
     * (EVM-based blockchains only) On EVM-based blockchains like Celo, Polygon or Ethereum, this is an array of block numbers, in which the NFT was received by the address
     */
    blockNumber?: Array<number>;
    metadata: Array<NftTokenByAddressErc721TokenMetadata>;
    /**
     * Only on Algorand, shows supply of <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    supply?: number;
    /**
     * Only on Algorand, shows decimals of <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    decimals?: number;
}
