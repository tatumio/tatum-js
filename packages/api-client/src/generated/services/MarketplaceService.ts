/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuyAssetOnMarketplace } from '../models/BuyAssetOnMarketplace';
import type { BuyAssetOnMarketplaceCelo } from '../models/BuyAssetOnMarketplaceCelo';
import type { BuyAssetOnMarketplaceCeloKMS } from '../models/BuyAssetOnMarketplaceCeloKMS';
import type { BuyAssetOnMarketplaceKMS } from '../models/BuyAssetOnMarketplaceKMS';
import type { BuyAssetOnMarketplaceSolana } from '../models/BuyAssetOnMarketplaceSolana';
import type { BuyAssetOnMarketplaceSolanaKMS } from '../models/BuyAssetOnMarketplaceSolanaKMS';
import type { CancelSellAssetOnMarketplace } from '../models/CancelSellAssetOnMarketplace';
import type { CancelSellAssetOnMarketplaceCelo } from '../models/CancelSellAssetOnMarketplaceCelo';
import type { CancelSellAssetOnMarketplaceCeloKMS } from '../models/CancelSellAssetOnMarketplaceCeloKMS';
import type { CancelSellAssetOnMarketplaceKMS } from '../models/CancelSellAssetOnMarketplaceKMS';
import type { CancelSellAssetOnMarketplaceSolana } from '../models/CancelSellAssetOnMarketplaceSolana';
import type { CancelSellAssetOnMarketplaceSolanaKMS } from '../models/CancelSellAssetOnMarketplaceSolanaKMS';
import type { EvmListingData } from '../models/EvmListingData';
import type { GenerateMarketplace } from '../models/GenerateMarketplace';
import type { GenerateMarketplaceCelo } from '../models/GenerateMarketplaceCelo';
import type { GenerateMarketplaceCeloKMS } from '../models/GenerateMarketplaceCeloKMS';
import type { GenerateMarketplaceKMS } from '../models/GenerateMarketplaceKMS';
import type { GenerateMarketplaceSolana } from '../models/GenerateMarketplaceSolana';
import type { GenerateMarketplaceSolanaKMS } from '../models/GenerateMarketplaceSolanaKMS';
import type { SellAssetOnMarketplace } from '../models/SellAssetOnMarketplace';
import type { SellAssetOnMarketplaceCelo } from '../models/SellAssetOnMarketplaceCelo';
import type { SellAssetOnMarketplaceCeloKMS } from '../models/SellAssetOnMarketplaceCeloKMS';
import type { SellAssetOnMarketplaceKMS } from '../models/SellAssetOnMarketplaceKMS';
import type { SellAssetOnMarketplaceSolana } from '../models/SellAssetOnMarketplaceSolana';
import type { SellAssetOnMarketplaceSolanaKMS } from '../models/SellAssetOnMarketplaceSolanaKMS';
import type { SignatureId } from '../models/SignatureId';
import type { SolanaListingData } from '../models/SolanaListingData';
import type { SolanaMarketplaceSellTransactionHash } from '../models/SolanaMarketplaceSellTransactionHash';
import type { SolanaMarketplaceTransactionHash } from '../models/SolanaMarketplaceTransactionHash';
import type { TransactionHash } from '../models/TransactionHash';
import type { UpdateFee } from '../models/UpdateFee';
import type { UpdateFeeCelo } from '../models/UpdateFeeCelo';
import type { UpdateFeeCeloKMS } from '../models/UpdateFeeCeloKMS';
import type { UpdateFeeKMS } from '../models/UpdateFeeKMS';
import type { UpdateFeeRecipient } from '../models/UpdateFeeRecipient';
import type { UpdateFeeRecipientCelo } from '../models/UpdateFeeRecipientCelo';
import type { UpdateFeeRecipientCeloKMS } from '../models/UpdateFeeRecipientCeloKMS';
import type { UpdateFeeRecipientKMS } from '../models/UpdateFeeRecipientKMS';
import type { UpdateFeeRecipientSolana } from '../models/UpdateFeeRecipientSolana';
import type { UpdateFeeRecipientSolanaKMS } from '../models/UpdateFeeRecipientSolanaKMS';
import type { UpdateFeeSolana } from '../models/UpdateFeeSolana';
import type { UpdateFeeSolanaKMS } from '../models/UpdateFeeSolanaKMS';
import type { UpdateMarketplaceSolana } from '../models/UpdateMarketplaceSolana';
import type { UpdateMarketplaceSolanaKMS } from '../models/UpdateMarketplaceSolanaKMS';
import type { WithdrawFromMarketplaceSolana } from '../models/WithdrawFromMarketplaceSolana';
import type { WithdrawFromMarketplaceSolanaKMS } from '../models/WithdrawFromMarketplaceSolanaKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class MarketplaceService {

    /**
     * Create an NFT marketplace
     * <p><b>2 credits per API call</b></p>
     * <p>Deploy an NFT marketplace smart contract on the blockchain. With a deployed marketplace smart contract, you and your customers can create new  listings for assets such as non-fungible tokens and combinations of token types as described by the ERC-721 and ERC-1155 standards on the Ethereum blockchain or by the equivalent standards on the other blockchains. As the marketplace operator, you can set a fee as a percentage of the asset price that will be paid on top of the asset price.</p>
     * <p>The purchase process looks like the following:</p>
     * <ol>
     * <li>The seller <a href="#operation/SellAssetOnMarketplace">creates a listing for an asset on the NFT marketplace</a>. The listing can be offered for the native blockchain assets (for example, ETH, BSC, and so on) or for the fungible tokens of the blockchain.</li>
     * <li>The seller <a href="https://apidoc.tatum.io/tag/Auction#operation/ApproveNftAuctionSpending" target="_blank">allows the marketplace smart contract to transfer the asset that they are selling</a>.</li>
     * <li>A buyer buys the asset.
     * <ul><li>If the buyer wants to pay with the <b>native blockchain assets</b>, they <a href="#operation/BuyAssetOnMarketplace">make the purchase</a> (the <code>buyAssetFromListing()</code> method is called against the marketplace smart contract) and send the required amount of the native assets to the marketplace smart contract.</li>
     * <li>If the buyer wants to pay with the <b>fungible tokens</b>:
     * <ol><li>The buyer <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve" target="_blank">allows the marketplace smart contract to access their tokens</a> and makes the purchase (the <code>buyAssetFromListing()</code> method is called against the marketplace smart contract).</li>
     * <li>The marketplace smart contract deducts the required amount of tokens from the smart contract where the buyer holds the tokens.</li></ol></li></ul></li>
     * <li>The marketplace smart contract transfers the asset to the buyer, transfers the asset price to the seller, and sends the fee to the marketplace fee recipient.</li>
     * </ol>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When deploying an NFT marketplace smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static generateMarketplace(
        requestBody: (GenerateMarketplace | GenerateMarketplaceKMS | GenerateMarketplaceCelo | GenerateMarketplaceCeloKMS | GenerateMarketplaceSolana | GenerateMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SolanaMarketplaceTransactionHash | SignatureId)> {
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
     * Update an NFT marketplace on Solana
     * <p><b>2 credits per API call</b></p>
     * <p>Update an NFT marketplace on Solana.</p>
     * <p>You can update it only if you are the marketplace operator.</p>
     * <p>This API is in <b>alpha</b> and is supported only for the mainnet on Solana.</p>
     * <p><b>Signing a transaction</b><br/>
     * When updating an NFT marketplace, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateMarketplace(
        requestBody: (UpdateMarketplaceSolana | UpdateMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'PUT',
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
     * Sell an asset on the NFT marketplace
     * <p><b>2 credits per API call</b></p>
     * <p>Create a new listing for an asset on the NFT marketplace. The listing can be offered for the native blockchain assets (for example, ETH, MATIC, and so on) or for any fungible tokens.</p>
     * <p>After the listing is created, <a href="https://apidoc.tatum.io/tag/Auction#operation/ApproveNftAuctionSpending" target="_blank">allow the marketplace smart contract to transfer the asset that you are selling</a>.</p>
     * <p>You can create a listing only for an existing asset that you own (you must be the owner of the asset).</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>A known issue on Harmony</b><br/>
     * On Harmony, when you are viewing a transaction in the Harmony Blockchain Explorer, the transaction status may be displayed as the following:<br/>
     * <code>Error reverted:x0</code><br/>
     * This is a known issue with the Harmony Blockchain Explorer. This status does not mean that the transaction failed. You can safely ignore it.</p>
     * <p><b>The "execution reverted" message</b><br/>
     * When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the marketplace version check and has no impact on completing the API call. You can safely ignore it.</p>
     * <p><b>Signing a transaction</b><br/>
     * When creating a new listing on the NFT marketplace, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sellAssetOnMarketplace(
        requestBody: (SellAssetOnMarketplace | SellAssetOnMarketplaceKMS | SellAssetOnMarketplaceCelo | SellAssetOnMarketplaceCeloKMS | SellAssetOnMarketplaceSolana | SellAssetOnMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId | SolanaMarketplaceSellTransactionHash)> {
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
     * Buy an asset on the NFT marketplace
     * <p><b>2 credits per API call</b></p>
     * <p>Buy an asset listed on the NFT marketplace.</p>
     * <p>You can buy the asset either for the native blockchain currency (for example, ETH, MATIC, and so on) or for the fungible tokens of the blockchain.</p>
     * <ul>
     * <li>If you want to pay for the asset with the <b>native blockchain currency</b>, send the required amount plus the marketplace fee right in the API call (in the <code>amount</code> request body parameter).</li>
     * <li>If you want to pay with the <b>fungible tokens</b>, <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve" target="_blank">allow the marketplace smart contract to access your tokens</a> before making the purchase. When you make the API call, the marketplace smart contract will deduct the required amount of the tokens from the smart contract where you hold the tokens.</li>
     * </ul>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>The "execution reverted" message</b><br/>
     * When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the marketplace version check and has no impact on completing the API call. You can safely ignore it.</p>
     * <p><b>Signing a transaction</b><br/>
     * When buying an asset on the NFT marketplace, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static buyAssetOnMarketplace(
        requestBody: (BuyAssetOnMarketplace | BuyAssetOnMarketplaceKMS | BuyAssetOnMarketplaceCelo | BuyAssetOnMarketplaceCeloKMS | BuyAssetOnMarketplaceSolana | BuyAssetOnMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * Cancel the selling of an asset on the NFT marketplace
     * <p><b>2 credits per API call</b></p>
     * <p>Cancel the selling of an asset on the NFT marketplace.</p>
     * <p>You can cancel the selling only if you are the seller of the asset or the marketplace operator. Once the selling is canceled, the asset is returned to the seller.</p>
     * <p>You cannot cancel the selling if the asset has already been purchased.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>The "execution reverted" message</b><br/>
     * When making this API call, you may get the following message:<br/>
     * <code>Although one or more Error Occurred [execution reverted] Contract Execution Completed</code><br/>
     * This message is a result of the marketplace version check and has no impact on completing the API call. You can safely ignore it.</p>
     * <p><b>Signing a transaction</b><br/>
     * When cancelling the selling of an asset, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static cancelSellMarketplaceListing(
        requestBody: (CancelSellAssetOnMarketplace | CancelSellAssetOnMarketplaceKMS | CancelSellAssetOnMarketplaceCelo | CancelSellAssetOnMarketplaceCeloKMS | CancelSellAssetOnMarketplaceSolana | CancelSellAssetOnMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * Get the listings of a certain type from the NFT marketplace
     * <p><b>1 credit per API call</b></p>
     * <p>Get the open, sold, or cancelled listings from the NFT marketplace.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @param type The type of listings to return
     * @returns string OK
     * @throws ApiError
     */
    public static getMarketplaceListings(
        chain: 'CELO' | 'ETH' | 'MATIC' | 'SOL',
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
     * Get information about a listing on the NFT marketplace
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about a specific listing on the NFT marketplace.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @param id Listing ID
     * @returns any OK
     * @throws ApiError
     */
    public static getMarketplaceListing(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC' | 'KLAY' | 'SOL',
        contractAddress: string,
        id: string,
    ): CancelablePromise<(EvmListingData | SolanaListingData)> {
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
     * Get information about an NFT marketplace on Solana
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about an NFT marketplace on Solana.</p>
     * <p>This API is in <b>alpha</b> and is supported only for the mainnet on Solana.</p>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns any OK
     * @throws ApiError
     */
    public static getMarketplaceInfo(
        chain: 'SOL',
        contractAddress: string,
    ): CancelablePromise<{
        /**
         * Fee Account Address
         */
        feeAccount: string;
        /**
         * Treasury Account Address
         */
        treasuryAccount: string;
        /**
         * Authority Address
         */
        authority: string;
        /**
         * Creator Address
         */
        creator: string;
        /**
         * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
         */
        marketplaceFee: number;
        /**
         * Address of a SPL token contract
         */
        treasuryMint: string;
        /**
         * The address that will be able to withdraw funds from the marketplace treasury account to own address
         */
        treasuryWithdrawalDestination: string;
        /**
         * The address that will be able to withdraw funds from the marketplace fee account to own address
         */
        feeWithdrawalDestination: string;
        /**
         * If set to "true", the marketplace must sign all operations related to the listings and sales.
         */
        requiresSignOff: boolean;
        /**
         * If set to "true", the marketplace can change the sale price that the seller intentionally set to 0.
         */
        canChangeSalePrice: boolean;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/marketplace/listing/${chain}/${contractAddress}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get the NFT marketplace fee
     * <p><b>1 credit per API call</b></p>
     * <p>Get the NFT marketplace fee.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns number OK
     * @throws ApiError
     */
    public static getMarketplaceFee(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC' | 'KLAY' | 'SOL',
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
     * Get the recipient of the NFT marketplace fee
     * <p><b>1 credit per API call</b></p>
     * <p>Get the recipient of the NFT marketplace fee.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Contract address
     * @returns any OK
     * @throws ApiError
     */
    public static getMarketplaceFeeRecipient(
        chain: 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC' | 'KLAY' | 'SOL',
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
     * Update the recipient of the NFT marketplace fee
     * <p><b>2 credits per API call</b></p>
     * <p>Update the recipient of the NFT marketplace fee.</p>
     * <p>You can update the fee recipient only if you are the marketplace operator.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When updating the recipient of the NFT marketplace fee, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateFeeRecipient(
        requestBody: (UpdateFeeRecipient | UpdateFeeRecipientKMS | UpdateFeeRecipientCelo | UpdateFeeRecipientCeloKMS | UpdateFeeRecipientSolana | UpdateFeeRecipientSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * Update the NFT marketplace fee
     * <p><b>2 credits per API call</b></p>
     * <p>Update the NFT marketplace fee.</p>
     * <p>You can update the marketplace fee only if you are the marketplace operator.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana (in <b>alpha</b>)</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When updating the NFT marketplace fee, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateFee(
        requestBody: (UpdateFee | UpdateFeeKMS | UpdateFeeCelo | UpdateFeeCeloKMS | UpdateFeeSolana | UpdateFeeSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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

    /**
     * Withdraw funds from the marketplace fee account on Solana
     * <p><b>2 credits per API call</b></p>
     * <p>Withdraw funds from the NFT marketplace fee account on Solana.</p>
     * <p>You can withdraw the funds only if you are the marketplace fee recipient.</p>
     * <p>This API is in <b>alpha</b> and is supported only for the mainnet on Solana.</p>
     * <p><b>Signing a transaction</b><br/>
     * When withdrawing the funds, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static withdrawFeeFromMarketplace(
        requestBody: (WithdrawFromMarketplaceSolana | WithdrawFromMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/withdraw/fee`,
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
     * Withdraw funds from the marketplace treasury account on Solana
     * <p><b>2 credits per API call</b></p>
     * <p>Withdraw funds from the NFT marketplace treasury account on Solana.</p>
     * <p>You can withdraw the funds only if you are the marketplace fee recipient.</p>
     * <p>This API is in <b>alpha</b> and is supported only for the mainnet on Solana.</p>
     * <p><b>Signing a transaction</b><br/>
     * When withdrawing the funds, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static withdrawTreasuryFromMarketplace(
        requestBody: (WithdrawFromMarketplaceSolana | WithdrawFromMarketplaceSolanaKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/marketplace/withdraw/treasury`,
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