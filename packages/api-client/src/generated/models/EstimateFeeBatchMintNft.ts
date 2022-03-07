/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeBatchMintNft = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'ONE' | 'MATIC' | 'KLAY';
    /**
     * Type of transaction
     */
    type: 'MINT_NFT_BATCH';
    /**
     * Address of the minter
     */
    sender: string;
    /**
     * Blockchain addresses to mint tokens to
     */
    recipients: Array<string>;
    /**
     * Contract address of NFT token
     */
    contractAddress?: string;
    /**
     * Token IDs
     */
    tokenIds: Array<string>;
    /**
     * Metadata URLs
     */
    urls: Array<string>;
}
