import { auctionTestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import { polygonAuctionService } from '../services/polygon.auction'

const blockchain = Blockchain.POLYGON

describe('PolygonSDK - auctions', () => {
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const auctionService = polygonAuctionService({
    blockchain,
    web3: {
      getClient: () => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  describe('prepare', () => {
    beforeEach(async () => {
      await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
    })

    describe('deploy auction', () => {
      auctionTestFactory.prepare.deployAuctionSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
    describe('create auction', () => {
      auctionTestFactory.prepare.createAuctionSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
    describe('update auction fee recipient', () => {
      auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
      )
    })
    describe('approve nft spending', () => {
      auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal mpolygonod call
     */
    xdescribe('approve erc20 spending', () => {
      auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal mpolygonod call
     */
    xdescribe('bid auction', () => {
      auctionTestFactory.prepare.auctionBidSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
    describe('cancel auction', () => {
      auctionTestFactory.prepare.auctionCancelSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
    describe('settle auction', () => {
      auctionTestFactory.prepare.auctionSettleSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
  })
})
