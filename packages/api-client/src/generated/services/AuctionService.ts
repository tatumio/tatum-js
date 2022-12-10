/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApproveNftSpending } from '../models/ApproveNftSpending';
import type { ApproveNftSpendingCelo } from '../models/ApproveNftSpendingCelo';
import type { ApproveNftSpendingCeloKMS } from '../models/ApproveNftSpendingCeloKMS';
import type { ApproveNftSpendingKMS } from '../models/ApproveNftSpendingKMS';
import type { BidOnAuction } from '../models/BidOnAuction';
import type { BidOnAuctionCelo } from '../models/BidOnAuctionCelo';
import type { BidOnAuctionCeloKMS } from '../models/BidOnAuctionCeloKMS';
import type { BidOnAuctionKMS } from '../models/BidOnAuctionKMS';
import type { CancelOrSettleAuction } from '../models/CancelOrSettleAuction';
import type { CancelOrSettleAuctionCelo } from '../models/CancelOrSettleAuctionCelo';
import type { CancelOrSettleAuctionCeloKMS } from '../models/CancelOrSettleAuctionCeloKMS';
import type { CancelOrSettleAuctionKMS } from '../models/CancelOrSettleAuctionKMS';
import type { CreateAuction } from '../models/CreateAuction';
import type { CreateAuctionCelo } from '../models/CreateAuctionCelo';
import type { CreateAuctionCeloKMS } from '../models/CreateAuctionCeloKMS';
import type { CreateAuctionKMS } from '../models/CreateAuctionKMS';
import type { GenerateAuction } from '../models/GenerateAuction';
import type { GenerateAuctionCelo } from '../models/GenerateAuctionCelo';
import type { GenerateAuctionCeloKMS } from '../models/GenerateAuctionCeloKMS';
import type { GenerateAuctionKMS } from '../models/GenerateAuctionKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
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

export class AuctionService {

    /**
     * Create NFT Auction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
     * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
     * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
     * Before auction is created, seller must approve transfer of the NFT to the auction contract.
     * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
     * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
     * Once there is higher bid then the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
     * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.<br/>
     * This operation deploys a smart contract on the blockchain.<br/>
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
    public static generateAuction(
        requestBody: (GenerateAuction | GenerateAuctionKMS | GenerateAuctionCelo | GenerateAuctionCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction`,
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
     * Sell asset on the NFT Auction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create new auction on the auction contract. Before operation, seller must approve spending of the NFT token for the Auction contract using <a href="#operation/ApproveNftAuctionSpending">Approve NFT</a>.
     * After auction is created, auction contract transfers the asset to the auction smart contract.
     * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.<br/>
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
    public static createAuction(
        requestBody: (CreateAuction | CreateAuctionKMS | CreateAuctionCelo | CreateAuctionCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction/sell`,
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
     * Bid for asset on the NFT Auction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Bid on the auction. Buyer must either send native assets with this operation, or <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve" target="_blank">approve ERC20 token spending</a> in advance.</p>
     * <p>After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.</p>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * <p><b>NOTE:</b> When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the auction version check and has no impact on completing the API call. You can safely ignore it.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static bidOnAuction(
        requestBody: (BidOnAuction | BidOnAuctionKMS | BidOnAuctionCelo | BidOnAuctionCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction/bid`,
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
     * Cancel auction of the asset on the NFT Auction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * <p><b>NOTE:</b> When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the auction version check and has no impact on completing the API call. You can safely ignore it.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static cancelAuction(
        requestBody: (CancelOrSettleAuction | CancelOrSettleAuctionKMS | CancelOrSettleAuctionCelo | CancelOrSettleAuctionCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction/cancel`,
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
     * Settle auction of the asset on the NFT Auction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * </ul>
     * <p><b>NOTE:</b> When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the auction version check and has no impact on completing the API call. You can safely ignore it.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static settleAuction(
        requestBody: (CancelOrSettleAuction | CancelOrSettleAuctionKMS | CancelOrSettleAuctionCelo | CancelOrSettleAuctionCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction/settle`,
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
     * Allow the auction or marketplace to transfer an asset
     * <p><b>2 credits per API call</b></p>
     * <p>Allow the auction/marketplace smart contract to transfer the asset (NFT or Multi Token) that is listed for selling.<br/>The auction/marketplace smart contract will transfer the asset to the buyer after the asset is purchased.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When allowing the auction/marketplace smart contract to transfer the asset, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static approveNftAuctionSpending(
        requestBody: (ApproveNftSpending | ApproveNftSpendingKMS | ApproveNftSpendingCelo | ApproveNftSpendingCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/auction/approve`,
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
     * Get auction details from the NFT Auction
     * <h4>1 credit per API call.</h4><br/><p>Get detail of the specific auction.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @param id Auction ID
     * @returns any OK
     * @throws ApiError
     */
    public static getAuction(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
        id: string,
    ): CancelablePromise<{
        /**
         * Amount of NFTs to sold in this auction. Valid only for ERC1155 listings.
         */
        amount?: string;
        /**
         * Address of the highest buyer, if exists.
         */
        bidder?: string;
        /**
         * Address of the ERC20 token smart contract, which should be used for paying for the asset..
         */
        erc20Address?: string;
        /**
         * If the listing is for ERC721 or ERC1155 token.
         */
        isErc721?: boolean;
        /**
         * Block height this auction started at.
         */
        startedAt?: string;
        /**
         * Block height this auction ended at.
         */
        endedAt?: string;
        /**
         * Address of the NFT smart contract.
         */
        nftAddress?: string;
        /**
         * Final auction price of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
         */
        endingPrice?: string;
        /**
         * Address of the seller.
         */
        seller?: string;
        /**
         * Current highest bid of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
         */
        highestBid?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/auction/${chain}/${contractAddress}/${id}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NFT Auction fee
     * <h4>1 credit per API call.</h4><br/><p>Get fee of the auction.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns number OK
     * @throws ApiError
     */
    public static getAuctionFee(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/auction/${chain}/${contractAddress}/fee`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NFT Auction fee recipient
     * <h4>1 credit per API call.</h4><br/><p>Get fee recipient of the auction.</p>
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns any OK
     * @throws ApiError
     */
    public static getAuctionFeeRecipient(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress: string,
    ): CancelablePromise<{
        /**
         * Address of the auction fee recipient.
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/auction/${chain}/${contractAddress}/recipient`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Update NFT Auction fee recipient
     * <h4>2 credits per API call.</h4><br/>
     * <p>Update fee recipient of the auction.<br/>
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
    public static updateAuctionFeeRecipient(
        requestBody: (UpdateFeeRecipient | UpdateFeeRecipientKMS | UpdateFeeRecipientCelo | UpdateFeeRecipientCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/auction/recipient`,
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
     * Update NFT Auction fee
     * <h4>2 credits per API call.</h4><br/>
     * <p>Update fee of the auction.<br/>
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
    public static updateAuctionFee(
        requestBody: (UpdateFee | UpdateFeeKMS | UpdateFeeCelo | UpdateFeeCeloKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/auction/fee`,
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