import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const bscAuctionExample = async () => {
  const auction = await bscSDK.marketplace.auction.getAuction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
    '1',
  )

  const auctionFee = await bscSDK.marketplace.auction.getAuctionFee(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
  )

  const auctionFeeRecipient = await bscSDK.marketplace.auction.getAuctionFeeRecipient(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
  )

  const deployAuctionTx = await bscSDK.marketplace.auction.prepare.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  })

  const updateFeeRecipientTx =
    await bscSDK.marketplace.auction.prepare.auctionUpdateFeeRecipientSignedTransaction({
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      fee: {
        gasLimit: '40000',
        gasPrice: '20',
      },
    })

  const createAuctionTx = await bscSDK.marketplace.auction.prepare.createAuctionSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nftAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    seller: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '1',
    endedAt: 100000,
    tokenId: '100000',
    isErc721: true,
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const approveNftSpendingTx =
    await bscSDK.marketplace.auction.prepare.auctionApproveNftTransferSignedTransaction({
      spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      isErc721: true,
      tokenId: '100000',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      nonce: 1,
      fee: {
        gasLimit: '40000',
        gasPrice: '20',
      },
    })

  const approveErc20SpendingTx =
    await bscSDK.marketplace.auction.prepare.auctionApproveErc20TransferSignedTransaction({
      amount: '100000',
      spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      nonce: 0,
    })

  const bidAuctionTx = await bscSDK.marketplace.auction.prepare.auctionBidSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    bidder: '0x587422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    bidValue: '1',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const cancelAuctionTx = await bscSDK.marketplace.auction.prepare.auctionCancelSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    bidValue: '100',
  })

  const settleAuctionTx = await bscSDK.marketplace.auction.prepare.auctionSettleSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    bidValue: '100',
  })
}
