import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { auctionTestFactory } from '@tatumio/shared-testing-evm-based'
import { TatumEthSDK } from '../eth.sdk'

describe('EthSDK - auctions', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  fdescribe('auction', () => {
    describe('getAuction', () => {
      auctionTestFactory.getAuction(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFee', () => {
      auctionTestFactory.getAuctionFee(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFeeRecipient', () => {
      auctionTestFactory.getAuctionFeeRecipient(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    describe('prepare', () => {
      describe('deploy auction', () => {
        auctionTestFactory.prepare.deployAuctionSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('create auction', () => {
        auctionTestFactory.prepare.createAuctionSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('update auction fee recipient', () => {
        auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('approve nft spending', () => {
        auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('approve erc20 spending', () => {
        auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('bid auction', () => {
        auctionTestFactory.prepare.auctionBidSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('cancel auction', () => {
        auctionTestFactory.prepare.auctionCancelSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
      describe('settle auction', () => {
        auctionTestFactory.prepare.auctionSettleSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
      })
    })
  })
})
