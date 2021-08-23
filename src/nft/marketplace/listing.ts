import BigNumber from 'bignumber.js';
import {ClassType} from 'class-transformer/ClassTransformer';
import {get, validateBody} from '../../connector/tatum';
import token_abi from '../../contracts/erc20/token_abi';
import * as listing from '../../contracts/marketplace';
import {
    ApproveMarketplaceErc20Spending,
    ApproveTronMarketplaceErc20Spending,
    CeloSmartContractMethodInvocation,
    CreateMarketplaceListing,
    CreateTronMarketplaceListing,
    Currency,
    DeployMarketplaceListing,
    DeployTronMarketplaceListing,
    InvokeMarketplaceListingOperation,
    InvokeTronMarketplaceListingOperation,
    SmartContractMethodInvocation,
    UpdateMarketplaceFee,
    UpdateMarketplaceFeeRecipient,
    UpdateTronMarketplaceFee,
    UpdateTronMarketplaceFeeRecipient
} from '../../model';
import {
    getBscBep20ContractDecimals,
    getCeloErc20ContractDecimals,
    getEthErc20ContractDecimals,
    getOne20ContractDecimals,
    getPolygonErc20ContractDecimals,
    prepareBscDeployMarketplaceListingSignedTransaction,
    prepareBscSmartContractWriteMethodInvocation,
    prepareCeloDeployMarketplaceListingSignedTransaction,
    prepareCeloSmartContractWriteMethodInvocation,
    prepareEthDeployMarketplaceListingSignedTransaction,
    prepareOneDeployMarketplaceListingSignedTransaction,
    prepareOneSmartContractWriteMethodInvocation,
    preparePolygonDeployMarketplaceListingSignedTransaction,
    preparePolygonSmartContractWriteMethodInvocation,
    prepareSmartContractWriteMethodInvocation,
    sendBscDeployMarketplaceListingSignedTransaction,
    sendCeloDeployMarketplaceListingSignedTransaction,
    sendEthDeployMarketplaceListingSignedTransaction,
    sendOneDeployMarketplaceListingSignedTransaction,
    sendPolygonDeployMarketplaceListingSignedTransaction
} from '../../transaction';

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
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPListingFee" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFee = async (chain: Currency, contractAddress: string): Promise<number> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/fee`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPListing" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceListing = async (chain: Currency, contractAddress: string, listingId: string): Promise<MarketplaceListing> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/listing/${listingId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPListingRecipient" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFeeRecipient = async (chain: Currency, contractAddress: string): Promise<{ address: string }> =>
    get(`/v3/blockchain/marketplace/listing/${chain}/${contractAddress}/recipient`)


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
    switch (body.chain) {
        case Currency.CELO:
            return await sendCeloDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return await sendOneDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        case Currency.ETH:
            return await sendEthDeployMarketplaceListingSignedTransaction(body, provider);
        case Currency.BSC:
            return await sendBscDeployMarketplaceListingSignedTransaction(body, provider);
        case Currency.MATIC:
            return await sendPolygonDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        // case Currency.TRON:
        //     return await sendTronDeployMarketplaceListingSignedTransaction(testnet, body as DeployTronMarketplaceListing, provider)
        default:
            throw new Error('Unsupported chain');
    }
}


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
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return await prepareOneDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        case Currency.ETH:
            return await prepareEthDeployMarketplaceListingSignedTransaction(body, provider);
        case Currency.BSC:
            return await prepareBscDeployMarketplaceListingSignedTransaction(body, provider);
        case Currency.MATIC:
            return await preparePolygonDeployMarketplaceListingSignedTransaction(testnet, body, provider);
        // case Currency.TRON:
        //     return await prepareTronDeployMarketplaceListingSignedTransaction(testnet, body as DeployTronMarketplaceListing, provider)
        default:
            throw new Error('Unsupported chain');
    }
}

/**
 * Update marketplace fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFee = async (testnet: boolean, body: UpdateMarketplaceFee | UpdateTronMarketplaceFee, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? UpdateTronMarketplaceFee : UpdateMarketplaceFee)
    const params = [`0x${new BigNumber(body.marketplaceFee).toString(16)}`]
    if (body.chain === Currency.TRON) {
        throw new Error('Unsupported chain');
        // return await prepareSCCall(testnet, body, UpdateTronMarketplaceFee, 'setMarketplaceFee',
        //     [
        //         {type: 'uint256', value: params[0]},
        //     ], 'setMarketplaceFee(uint256)', provider)
    } else {
        return await prepareSCCall(testnet, body, UpdateMarketplaceFee, 'setMarketplaceFee', params, undefined, provider)
    }
}

/**
 * Update marketplace fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient | UpdateTronMarketplaceFeeRecipient, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? UpdateTronMarketplaceFeeRecipient : UpdateMarketplaceFeeRecipient)
    const params = [body.feeRecipient]
    if (body.chain === Currency.TRON) {
        throw new Error('Unsupported chain');
        // return await prepareSCCall(testnet, body, UpdateTronMarketplaceFeeRecipient, 'setMarketplaceFeeRecipient',
        //     [
        //         {type: 'address', value: convertAddressToHex(params[0])},
        //     ], 'setMarketplaceFeeRecipient(address)', provider)
    } else {
        return await prepareSCCall(testnet, body, UpdateMarketplaceFeeRecipient, 'setMarketplaceFeeRecipient', params, undefined, provider)
    }
}

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveMarketplaceErc20Spending | ApproveTronMarketplaceErc20Spending, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? ApproveTronMarketplaceErc20Spending : ApproveMarketplaceErc20Spending)
    let amount
    switch (body.chain) {
        case Currency.CELO:
            amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16)
            break
        case Currency.ONE:
            amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.contractAddress, provider))).toString(16)
            break;
        case Currency.ETH:
            amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
            break;
        case Currency.BSC:
            amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
            break;
        case Currency.MATIC:
            amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16);
            break;
        // case Currency.TRON:
        //     amount = new BigNumber(body.amount).multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.contractAddress, provider))).toString(16)
        //     break
        default:
            throw new Error('Unsupported combination of inputs.');
    }
    const params = [body.marketplaceAddress, `0x${amount}`];
    body.amount = '0';
    // if (body.chain === Currency.TRON) {
    //     return await prepareSCCall(testnet, body, ApproveTronMarketplaceErc20Spending, 'approve',
    //         [
    //             {type: 'address', value: convertAddressToHex(params[0])},
    //             {type: 'uint256', value: params[1]},
    //         ], 'approve(address,uint256)', provider, token_abi)
    // } else {
    return await prepareSCCall(testnet, body, ApproveMarketplaceErc20Spending, 'approve', params, undefined, provider, token_abi);
    // }
}

/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCreateListing = async (testnet: boolean, body: CreateMarketplaceListing | CreateTronMarketplaceListing, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? CreateTronMarketplaceListing : CreateMarketplaceListing)
    const params = [body.listingId, body.isErc721, body.nftAddress.trim(), `0x${new BigNumber(body.tokenId).toString(16)}`,
        `0x${new BigNumber(body.price).multipliedBy(body.chain === Currency.TRON ? 1e6 : 1e18).toString(16)}`, body.seller.trim(), `0x${new BigNumber(body.amount || 0).toString(16)}`,
        body.erc20Address || '0x0000000000000000000000000000000000000000']
    if (body.chain === Currency.TRON) {
        throw new Error('Unsupported chain');
        // if (!body.erc20Address) {
        //     params[7] = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
        // }
        // return await prepareSCCall(testnet, body, CreateTronMarketplaceListing, 'createListing',
        //     [
        //         {type: 'string', value: params[0]},
        //         {type: 'bool', value: params[1]},
        //         {type: 'address', value: convertAddressToHex(params[2] as string)},
        //         {type: 'uint256', value: params[3]},
        //         {type: 'uint256', value: params[4]},
        //         {type: 'address', value: convertAddressToHex(params[5] as string)},
        //         {type: 'uint256', value: params[6]},
        //         {type: 'address', value: convertAddressToHex(params[7] as string)},
        //     ], 'createListing(string,bool,address,uint256,uint256,address,uint256,address)', provider)
    } else {
        body.amount = undefined;
        return await prepareSCCall(testnet, body, CreateMarketplaceListing, 'createListing', params, undefined, provider)
    }
}

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceBuyListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? InvokeTronMarketplaceListingOperation : InvokeMarketplaceListingOperation);
    const params = [body.listingId, body.erc20Address || '0x0000000000000000000000000000000000000000'];
    if (body.erc20Address) {
        body.amount = undefined;
    }
    if (body.chain === Currency.TRON) {
        throw new Error('Unsupported chain');
        // return await prepareSCCall(testnet, body, InvokeTronMarketplaceListingOperation, 'buyAssetFromListing',
        //     [
        //         {type: 'string', value: params[0]},
        //         {type: 'address', value: convertAddressToHex(params[1])},
        //     ], 'buyAssetFromListing(string,address)', provider);
    } else {
        return await prepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'buyAssetFromListing', params, undefined, provider);
    }
}

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCancelListing = async (testnet: boolean, body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation, provider?: string) => {
    await validateBody(body, body.chain === Currency.TRON ? InvokeTronMarketplaceListingOperation : InvokeMarketplaceListingOperation)
    const params = [body.listingId]
    if (body.chain === Currency.TRON) {
        throw new Error('Unsupported chain');
        // return await prepareSCCall(testnet, body, InvokeTronMarketplaceListingOperation, 'cancelListing',
        //     [
        //         {type: 'string', value: params[0]},
        //     ], 'cancelListing(string)', provider)
    } else {
        return await prepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'cancelListing', params, undefined, provider)
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const prepareSCCall = async (testnet: boolean, body: any, clazz: ClassType<object>, methodName: string, params: any[], methodSig?: string,
                             provider?: string, abi: any[] = listing.abi) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation;
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation();
    } else {
        r = new SmartContractMethodInvocation();
    }
    r.fee = body.fee;
    r.nonce = body.nonce;
    r.fromPrivateKey = body.fromPrivateKey;
    r.signatureId = body.signatureId
    r.index = body.index
    r.amount = body.amount
    r.contractAddress = body.contractAddress
    r.methodName = methodName
    r.params = params
    r.methodABI = abi.find(a => a.name === r.methodName)
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider);
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider);
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider);
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);
        // case Currency.TRON:
        //     r.methodName = methodSig as string
        //     return await prepareTronSmartContractInvocation(testnet, r, body.feeLimit, body.from, provider)
        default:
            throw new Error('Unsupported combination of inputs.');
    }
}
