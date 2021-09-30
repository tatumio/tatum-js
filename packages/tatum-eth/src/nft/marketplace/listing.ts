import BigNumber from 'bignumber.js';
import {get, validateBody} from '@tatumio/tatum-core';
import {
    ApproveErc20,
    CreateMarketplaceListing,
    Currency,
    DeployMarketplaceListing,
    DeployTronMarketplaceListing,
    InvokeMarketplaceListingOperation,
    UpdateMarketplaceFee,
    UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core';
import {
    prepareEthDeployMarketplaceListingSignedTransaction,
    sendEthDeployMarketplaceListingSignedTransaction,
} from '../../transaction';
import { helperBroadcastTx, helperPrepareSCCall } from 'src/helpers';
import { prepareApproveErc20 } from 'src/fungible';

// TODO: A lot of this could go to core?

enum ListingState {
    INITIATED = '0',
    SOLD = '1',
    CANCELLED = '2'
}

export interface MarketplaceListing {
    /**
     * ID of the listing
     */
    listingId: string;

    /**
     * whether listing is for ERC721 or ERC1155
     */
    isErc721: boolean;

    /**
     * State of the listing,
     */
    state: ListingState;

    /**
     * Address of the NFT asset contract
     */
    nftAddress: string;

    /**
     * Address of the seller
     */
    seller: string;

    /**
     * Address of the ERC20 token, which will be used for paying. 0x0 if native asset is used
     */
    erc20Address: string;

    /**
     * TokenID to sell
     */
    tokenId: string;

    /**
     * Amount of assets to sell. Valid only for ERC1155.
     */
    amount: string;

    /**
     * Price to sell asset for.
     */
    price: string;

    /**
     * Address of the buyer, if already exists.
     */
    buyer: string;
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceFee" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFee = async (chain: Currency, contractAddress: string): Promise<number> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/fee`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceListing" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceListing = async (chain: Currency, contractAddress: string, listingId: string): Promise<MarketplaceListing> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/listing/${listingId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceFeeRecipient" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFeeRecipient = async (chain: Currency, contractAddress: string): Promise<{ address: string }> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/recipient`);

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
 * Once the listing is created, seller must send the NFT asset to the smart contract.
 * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
 * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
 * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
 * and marketplace fee is set to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const deployMarketplaceListing = async (testnet: boolean, body: DeployMarketplaceListing | DeployTronMarketplaceListing, provider?: string) => {
    return await sendEthDeployMarketplaceListingSignedTransaction(body, provider);
};

/**
 * Prepare signed transaction for deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
 * Once the listing is created, seller must send the NFT asset to the smart contract.
 * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
 * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
 * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
 * and marketplace fee is set to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployMarketplaceListing = async (testnet: boolean, body: DeployMarketplaceListing | DeployTronMarketplaceListing, provider?: string) => {
    return await prepareEthDeployMarketplaceListingSignedTransaction(body, provider);
};

/**
 * Update marketplace fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFee = async (testnet: boolean, body: UpdateMarketplaceFee & { chain: Currency.ETH }, provider?: string) => {
    await validateBody(body, UpdateMarketplaceFee);
    const params = [`0x${new BigNumber(body.marketplaceFee).toString(16)}`];
    return await helperPrepareSCCall(testnet, body, UpdateMarketplaceFee, 'setMarketplaceFee', params, undefined, provider);
};

/**
 * Update marketplace fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient & { chain: Currency.ETH }, provider?: string) => {
    await validateBody(body, UpdateMarketplaceFeeRecipient);
    const params = [body.feeRecipient];
    return await helperPrepareSCCall(testnet, body, UpdateMarketplaceFeeRecipient, 'setMarketplaceFeeRecipient', params, undefined, provider);
};

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
    return prepareApproveErc20(testnet, body, provider);
};

/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCreateListing = async (testnet: boolean, body: CreateMarketplaceListing & { chain: Currency.ETH }, provider?: string) => {
    await validateBody(body, CreateMarketplaceListing);
    const params = [body.listingId, body.isErc721, body.nftAddress.trim(), `0x${new BigNumber(body.tokenId).toString(16)}`,
        `0x${new BigNumber(body.price).multipliedBy(1e18).toString(16)}`, body.seller.trim(), `0x${new BigNumber(body.amount || 0).toString(16)}`,
        body.erc20Address || '0x0000000000000000000000000000000000000000'];
    body.amount = undefined;
    return await helperPrepareSCCall(testnet, body, CreateMarketplaceListing, 'createListing', params, undefined, provider);
};

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceBuyListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation & { chain: Currency.ETH }, provider?: string) => {
    await validateBody(body, InvokeMarketplaceListingOperation);
    const params = [body.listingId, body.erc20Address || '0x0000000000000000000000000000000000000000'];
    if (body.erc20Address) {
        body.amount = undefined;
    }    
    return await helperPrepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'buyAssetFromListing', params, undefined, provider);
};

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCancelListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation  & { chain: Currency.ETH }, provider?: string) => {
    await validateBody(body, InvokeMarketplaceListingOperation);
    const params = [body.listingId];
    return await helperPrepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'cancelListing', params, undefined, provider);
};

/**
 * Update marketplace fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFee = async (testnet: boolean, body: UpdateMarketplaceFee  & { chain: Currency.ETH }, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceUpdateFee(testnet, body, provider), body.signatureId);
/**
 * Update marketplace fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient  & { chain: Currency.ETH }, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceUpdateFeeRecipient(testnet, body, provider), body.signatureId);
/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceApproveErc20Spending(testnet, body, provider), body.signatureId);
/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCreateListing = async (testnet: boolean, body: CreateMarketplaceListing  & { chain: Currency.ETH }, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceCreateListing(testnet, body, provider), body.signatureId);
/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceBuyListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation  & { chain: Currency.ETH }, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceBuyListing(testnet, body, provider), body.signatureId);
/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCancelListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation  & { chain: Currency.ETH }, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareMarketplaceCancelListing(testnet, body, provider), body.signatureId);

