/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BuyAssetOnMarketplaceTron = {
    /**
     * Blockchain to work with.
     */
    chain: BuyAssetOnMarketplaceTron.chain;
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Optional address of the TRC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * In case of the ERC20 listing, it's possible to buy on behalf of someone else. This value is the address of the buyer, which should approve spending of the ERC20 tokens for the Marketplace contract. This could be used for a buying from the custodial wallet address.
     */
    buyer?: string;
    /**
     * ID of the listing. It's up to the developer to generate unique ID
     */
    listingId: string;
    /**
     * Amount of the assets to be sent. For ERC-721 tokens, enter 1.
     */
    amount?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace BuyAssetOnMarketplaceTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
