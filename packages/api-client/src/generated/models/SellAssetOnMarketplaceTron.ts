/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SellAssetOnMarketplaceTron = {
    /**
     * Blockchain to work with.
     */
    chain: SellAssetOnMarketplaceTron.chain;
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Address of the NFT asset to sell smart contract.
     */
    nftAddress: string;
    /**
     * Address of the seller of the NFT asset.
     */
    seller: string;
    /**
     * Optional address of the TRC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * ID of the listing. It's up to the developer to generate unique ID
     */
    listingId: string;
    /**
     * Amount of the assets to be sent. For ERC-721 tokens, enter 1.
     */
    amount?: string;
    /**
     * ID of token, if transaction is for ERC-721 or ERC-1155.
     */
    tokenId: string;
    /**
     * Price of the asset to sell. Marketplace fee will be obtained on top of this price.
     */
    price: string;
    /**
     * True if asset is NFT of type ERC721, false if ERC1155.
     */
    isErc721: boolean;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace SellAssetOnMarketplaceTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
