import {
    ApproveErc20,
    ApproveNftTransfer, CreateAuction,
    Currency,
    DeployNftAuction, InvokeAuctionOperation,
    UpdateAuctionFee,
    UpdateMarketplaceFeeRecipient
} from "@tatumio/tatum-core";

type AuctionFn =
    'deployAuction'
    | 'prepareDeployAuction'
    | 'prepareAuctionUpdateFee'
    | 'prepareAuctionUpdateFeeRecipient'
    | 'prepareAuctionApproveNftTransfer'
    | 'prepareAuctionApproveErc20Transfer'
    | 'prepareAuctionCreate'
    | 'prepareAuctionBid'
    | 'prepareAuctionCancel'
    | 'prepareAuctionSettle'
    | 'sendAuctionUpdateFee'
    | 'sendAuctionUpdateFeeRecipient'
    | 'sendAuctionApproveNftTransfer'
    | 'sendAuctionApproveErc20Transfer'
    | 'sendAuctionCreate'
    | 'sendAuctionBid'
    | 'sendAuctionCancel'
    | 'sendAuctionSettle'

async function getImplementationFor(currency: Currency, functionName: AuctionFn) {
    let chain
    switch (currency) {
        case Currency.BSC:
            chain = 'bsc'
            break
        case Currency.CELO:
            chain = 'celo'
            break
        case Currency.ETH:
            chain = 'eth'
            break
        case Currency.ONE:
            chain = 'one'
            break
        case Currency.MATIC:
            chain = 'polygon'
            break
        default:
            throw new Error(`Not defined for ${currency} blockchain`)
    }
    try {
        const module = await import(`@tatumio/tatum-${chain}`)
        return module[functionName]
    } catch (e) {
        console.error(`Importing ${functionName} function for ${currency} currency failed`)
        console.error(e)
        throw new Error(e)
    }
}

/**
 * Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export async function deployAuction(currency: Currency, testnet: boolean, body: DeployNftAuction, provider?: string) {
    const blockchainDeployAuction = await getImplementationFor(currency, 'deployAuction')
    return await blockchainDeployAuction(testnet, body, provider)
}

/**
 * Prepare signed transaction for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export async function prepareDeployAuction(currency: Currency, testnet: boolean, body: DeployNftAuction, provider?: string) {
    const blockchainPrepareDeployAuction = await getImplementationFor(currency, 'prepareDeployAuction')
    return await blockchainPrepareDeployAuction(testnet, body, provider)
}

/**
 * Update auction fee.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFee = async (currency: Currency, testnet: boolean, body: UpdateAuctionFee, provider?: string) => {
    const blockchainPrepareAuctionUpdateFee = await getImplementationFor(currency, 'prepareAuctionUpdateFee')
    return await blockchainPrepareAuctionUpdateFee(testnet, body, provider)
}

/**
 * Update auction fee recipient.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeRecipient = async (currency: Currency, testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) => {
    const blockchainPrepareAuctionUpdateFeeRecipient = await getImplementationFor(currency, 'prepareAuctionUpdateFeeRecipient')
    return await blockchainPrepareAuctionUpdateFeeRecipient(testnet, body, provider)
}

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveNftTransfer = async (currency: Currency, testnet: boolean, body: ApproveNftTransfer, provider?: string) => {
    const blockchainPrepareAuctionApproveNftTransfer = await getImplementationFor(currency, 'prepareAuctionApproveNftTransfer')
    return await blockchainPrepareAuctionApproveNftTransfer(testnet, body, provider)
}

/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveErc20Transfer = async (currency: Currency, testnet: boolean, body: ApproveErc20, provider?: string) => {
    const blockchainPrepareAuctionApproveErc20Transfer = await getImplementationFor(currency, 'prepareAuctionApproveErc20Transfer')
    return await blockchainPrepareAuctionApproveErc20Transfer(testnet, body, provider)
}

/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCreate = async (currency: Currency, testnet: boolean, body: CreateAuction, provider?: string) => {
    const blockchainPrepareAuctionCreate = await getImplementationFor(currency, 'prepareAuctionCreate')
    return await blockchainPrepareAuctionCreate(testnet, body, provider)
}

/**
 * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionBid = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainPrepareAuctionBid = await getImplementationFor(currency, 'prepareAuctionBid')
    return await blockchainPrepareAuctionBid(testnet, body, provider)
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancel = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainPrepareAuctionCancel = await getImplementationFor(currency, 'prepareAuctionCancel')
    return await blockchainPrepareAuctionCancel(testnet, body, provider)
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettle = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainPrepareAuctionSettle = await getImplementationFor(currency, 'prepareAuctionSettle')
    return await blockchainPrepareAuctionSettle(testnet, body, provider)
}

/**
 * Update auction fee.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFee = async (currency: Currency, testnet: boolean, body: UpdateAuctionFee, provider?: string) => {
    const blockchainSendAuctionUpdateFee = await getImplementationFor(currency, 'sendAuctionUpdateFee')
    return await blockchainSendAuctionUpdateFee(testnet, body, provider)
}

/**
 * Update auction fee recipient.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFeeRecipient = async (currency: Currency, testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) => {
    const blockchainSendAuctionUpdateFeeRecipient = await getImplementationFor(currency, 'sendAuctionUpdateFeeRecipient')
    return await blockchainSendAuctionUpdateFeeRecipient(testnet, body, provider)
}

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveNftTransfer = async (currency: Currency, testnet: boolean, body: ApproveNftTransfer, provider?: string) => {
    const blockchainSendAuctionApproveNftTransfer = await getImplementationFor(currency, 'sendAuctionApproveNftTransfer')
    return await blockchainSendAuctionApproveNftTransfer(testnet, body, provider)
}

/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveErc20Transfer = async (currency: Currency, testnet: boolean, body: ApproveErc20, provider?: string) => {
    const blockchainSendAuctionApproveErc20Transfer = await getImplementationFor(currency, 'sendAuctionApproveErc20Transfer')
    return await blockchainSendAuctionApproveErc20Transfer(testnet, body, provider)
}

/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCreate = async (currency: Currency, testnet: boolean, body: CreateAuction, provider?: string) => {
    const blockchainSendAuctionCreate = await getImplementationFor(currency, 'sendAuctionCreate')
    return await blockchainSendAuctionCreate(testnet, body, provider)
}

/**
 * Bid auction on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionBid = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainSendAuctionBid = await getImplementationFor(currency, 'sendAuctionBid')
    return await blockchainSendAuctionBid(testnet, body, provider)
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCancel = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainSendAuctionCancel = await getImplementationFor(currency, 'sendAuctionCancel')
    return await blockchainSendAuctionCancel(testnet, body, provider)
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param currency chain to work with
 * @param testnet if we are on testnet or not
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionSettle = async (currency: Currency, testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
    const blockchainSendAuctionSettle = await getImplementationFor(currency, 'sendAuctionSettle')
    return await blockchainSendAuctionSettle(testnet, body, provider)
}

export { getAuctionFee, getAuction, getAuctionFeeRecipient, } from "@tatumio/tatum-core";
