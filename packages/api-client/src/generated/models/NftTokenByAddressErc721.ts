/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftTokenByAddressErc721TokenMetadata } from './NftTokenByAddressErc721TokenMetadata';

export type NftTokenByAddressErc721 = {
    /**
     * On Algorand, this is the asset ID (the ID of the NFT); on the other blockchains, this is the address of the NFT smart contract.
     */
    contractAddress: string;
    /**
     * On Algorand, this is either an array of "1" to indicate that the NFTs with the specified IDs exist, or an array with the number of NFT fractions if the NFTs are <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional</a>; on the other blockchains, this is an array of the IDs of the NFTs.
     */
    balances: Array<string>;
    /**
     * (EVM-based blockchains only) An array of the numbers of the blocks in which the NFT was received by the address
     */
    blockNumber?: Array<number>;
    metadata: Array<NftTokenByAddressErc721TokenMetadata>;
    /**
     * (Algorand only) The number of fractions in the NFT if the NFT is <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional</a>
     */
    supply?: number;
    /**
     * (Algorand only) The number of decimal places in an NFT fraction if the NFT is <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional</a>
     */
    decimals?: number;
}
