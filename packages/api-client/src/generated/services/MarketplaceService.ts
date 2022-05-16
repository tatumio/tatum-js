/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuyAssetOnMarketplace } from '../models/BuyAssetOnMarketplace';
import type { BuyAssetOnMarketplaceCelo } from '../models/BuyAssetOnMarketplaceCelo';
import type { BuyAssetOnMarketplaceCeloKMS } from '../models/BuyAssetOnMarketplaceCeloKMS';
import type { BuyAssetOnMarketplaceKMS } from '../models/BuyAssetOnMarketplaceKMS';
import type { CancelSellAssetOnMarketplace } from '../models/CancelSellAssetOnMarketplace';
import type { CancelSellAssetOnMarketplaceCelo } from '../models/CancelSellAssetOnMarketplaceCelo';
import type { CancelSellAssetOnMarketplaceCeloKMS } from '../models/CancelSellAssetOnMarketplaceCeloKMS';
import type { CancelSellAssetOnMarketplaceKMS } from '../models/CancelSellAssetOnMarketplaceKMS';
import type { GenerateMarketplace } from '../models/GenerateMarketplace';
import type { GenerateMarketplaceCelo } from '../models/GenerateMarketplaceCelo';
import type { GenerateMarketplaceCeloKMS } from '../models/GenerateMarketplaceCeloKMS';
import type { GenerateMarketplaceKMS } from '../models/GenerateMarketplaceKMS';
import type { SellAssetOnMarketplace } from '../models/SellAssetOnMarketplace';
import type { SellAssetOnMarketplaceCelo } from '../models/SellAssetOnMarketplaceCelo';
import type { SellAssetOnMarketplaceCeloKMS } from '../models/SellAssetOnMarketplaceCeloKMS';
import type { SellAssetOnMarketplaceKMS } from '../models/SellAssetOnMarketplaceKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { UpdateFee } from '../models/UpdateFee';
import type { UpdateFeeCelo } from '../models/UpdateFeeCelo';
import type { UpdateFeeCeloKMS } from '../models/UpdateFeeCeloKMS';
import type { UpdateFeeKMS } from '../models/UpdateFeeKMS';
import type { UpdateFeeRecipient } from '../models/UpdateFeeRecipient';
import type { UpdateFeeRecipientCelo } from '../models/UpdateFeeRecipientCelo';
import type { UpdateFeeRecipientCeloKMS } from '../models/UpdateFeeRecipientCeloKMS';
import type { UpdateFeeRecipientKMS } from '../models/UpdateFeeRecipientKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class MarketplaceService {

    /**
     * Create NFT Marketplace
     * <h4>2 credits per API call.</h4><br/>
     * <p>Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
     * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
     * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
     * Once the listing is created, seller must send the NFT asset to the smart contract.
     * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
     * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
     * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
     * and marketplace fee is set to the operator.<br/>
     * This operation deploys a smart contract on the blockchain.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Klaytn</li>
     * <li>Polygon (Matic)</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static generateMarketplace(
        requestBody: (GenerateMarketplace | GenerateMarketplaceKMS | GenerateMarketplaceCelo | GenerateMarketplaceCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/listing`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Sell asset on the NFT Marketplace
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
     * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
     * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * *Note:
     * In the new tatum ERC721 smart contract, we have added an option for the author to set royalties on every transfer and in any currency.
     * To make it backwards compatible with the previous logic we have added a check to see if you are using the new or old version.
     * If you are using older version of the marketplace/auction, you may notice a warning in the explorer which says:
     * "Although one or more Error Occurred [execution reverted] Contract Execution Completed"
     *
     * You can ignore the above warning, this has no impact on the functionality and is a response of internal transaction
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sellAssetOnMarketplace(
        requestBody: (SellAssetOnMarketplace | SellAssetOnMarketplaceKMS | SellAssetOnMarketplaceCelo | SellAssetOnMarketplaceCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/listing/sell`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Buy asset on the NFT Marketplace
     * <h4>2 credits per API call.</h4><br/>
     * <p>Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before using <a href="#operation/Erc20Approve">Approve spending for marketplace.</a><br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * *Note:
     * In the new tatum ERC721 smart contract, we have added an option for the author to set royalties on every transfer and in any currency.
     * To make it backwards compatible with the previous logic we have added a check to see if you are using the new or old version.
     * If you are using older version of the marketplace/auction, you may notice a warning in the explorer which says:
     * "Although one or more Error Occurred [execution reverted] Contract Execution Completed"
     *
     * You can ignore the above warning, this has no impact on the functionality and is a response of internal transaction
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static buyAssetOnMarketplace(
        requestBody: (BuyAssetOnMarketplace | BuyAssetOnMarketplaceKMS | BuyAssetOnMarketplaceCelo | BuyAssetOnMarketplaceCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/listing/buy`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Cancel selling of the asset on the NFT Marketplace
     * <h4>2 credits per API call.</h4><br/>
     * <p>Canceling the auction is only possible for the seller or the operator.
     * The auction cannot be canceled if a buyer already purchased an NFT.
     * Once the auction is canceled, the NFT asset is reverted to the seller.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * *Note:
     * In the new tatum ERC721 smart contract, we have added an option for the author to set royalties on every transfer and in any currency.
     * To make it backwards compatible with the previous logic we have added a check to see if you are using the new or old version.
     * If you are using older version of the marketplace/auction, you may notice a warning in the explorer which says:
     * "Although one or more Error Occurred [execution reverted] Contract Execution Completed"
     *
     * You can ignore the above warning, this has no impact on the functionality and is a response of internal transaction
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static cancelSellMarketplaceListing(
        requestBody: (CancelSellAssetOnMarketplace | CancelSellAssetOnMarketplaceKMS | CancelSellAssetOnMarketplaceCelo | CancelSellAssetOnMarketplaceCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/listing/cancel`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get open/cancelled/sold listings from the NFT Marketplace
     * <h4>1 credit per API call.</h4><br/><p>Get list of listings in this marketplace.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @param type Listing ID
     * @returns string OK
     * @throws ApiError
     */
    public static getMarketplaceListings(
        chain: 'CELO',
        contractAddress: string,
        type: 'INITIATED' | 'SOLD' | 'CANCELLED',
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/${type}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get listing from the NFT Marketplace
     * <h4>1 credit per API call.</h4><br/><p>Get detail of the specific listing.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @param id Listing ID
     * @returns any OK
     * @throws ApiError
     */
    public static getMarketplaceListing(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
        id: string,
    ): CancelablePromise<{
        /**
         * Amount of NFTs to sold in this listing. Valid only for ERC1155 listings.
         */
        amount?: string;
        /**
         * Address of the buyer, if exists.
         */
        buyer?: string;
        /**
         * Address of the ERC20 token smart contract, which should be used for paying for the asset..
         */
        erc20Address?: string;
        /**
         * If the listing is for ERC721 or ERC1155 token.
         */
        isErc721?: boolean;
        /**
         * ID of the listing.
         */
        listingId?: string;
        /**
         * Address of the NFT smart contract.
         */
        nftAddress?: string;
        /**
         * Price of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
         */
        price?: string;
        /**
         * Address of the seller.
         */
        seller?: string;
        /**
         * State of the listing. 0 - available, 1-1sold, 2 - cancelled
         */
        state?: '0' | '1' | '2';
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/listing/${id}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NFT Marketplace fee
     * <h4>1 credit per API call.</h4><br/><p>Get fee of the marketplace.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns number OK
     * @throws ApiError
     */
    public static getMarketplaceFee(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/fee`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NFT Marketplace fee recipient
     * <h4>1 credit per API call.</h4><br/><p>Get fee recipient of the marketplace.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns any OK
     * @throws ApiError
     */
    public static getMarketplaceFeeRecipient(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
    ): CancelablePromise<{
        /**
         * Address of the marketplace fee recipient.
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/recipient`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Update NFT Marketplace fee recipient
     * <h4>2 credits per API call.</h4><br/>
     * <p>Update fee recipient of the marketplace.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateFeeRecipient(
        requestBody: (UpdateFeeRecipient | UpdateFeeRecipientKMS | UpdateFeeRecipientCelo | UpdateFeeRecipientCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/marketplace/listing/recipient`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Update NFT Marketplace fee
     * <h4>2 credits per API call.</h4><br/>
     * <p>Update fee of the marketplace.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateFee(
        requestBody: (UpdateFee | UpdateFeeKMS | UpdateFeeCelo | UpdateFeeCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/marketplace/listing/fee`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}