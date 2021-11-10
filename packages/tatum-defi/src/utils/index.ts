import {Currency} from "@tatumio/tatum-core";

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

type NFTFn = 'mintNFT'
    | 'deployNFT'
    | 'createNFT'
    | 'mintNFTWithUri'
    | 'mintMultipleNFTWithUri'
    | 'burnNFT'
    | 'updateCashbackForAuthorNFT'
    | 'transferNFT'

export async function getImplementationFor(currency: Currency, functionName: AuctionFn | NFTFn) {
    let chain
    switch (currency) {
        case Currency.ALGO:
            chain = 'algo'
            break
        case Currency.BSC:
            chain = 'bsc'
            break
        case Currency.BCH:
            chain = 'bch'
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
    let module
    try {
        module = await import(`@tatumio/tatum-${chain}`)
    } catch (e) {
        console.error(`Importing ${functionName} function for ${currency} currency failed`)
        console.error(e)
        throw new Error(e)
    }
    const blockchainFn = module[functionName];
    if (blockchainFn) {
        return blockchainFn
    } else {
        throw new Error(`${functionName} function for ${currency} currency is not defined`)
    }
}
