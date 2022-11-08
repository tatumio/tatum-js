import { auctionTestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import { oneAuctionService } from '../services/one.auction'
import { TatumOneSDK } from '../one.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const blockchain = Blockchain.HARMONY

describe('OneSDK - auctions', () => {
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const sdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  const auctionService = oneAuctionService({
    blockchain,
    web3: {
      getClient: () => inmemoryBlockchain.web3,
      getGasPriceInWei: sdk.getGasPriceInWei,
    },
  })

  describe('prepare', () => {
    beforeEach(async () => {
      await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
    })

    describe('deploy auction', () => {
      auctionTestFactory.prepare.deployAuctionSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    describe('create auction', () => {
      auctionTestFactory.prepare.createAuctionSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    describe('update auction fee recipient', () => {
      auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    describe('approve nft spending', () => {
      auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal moneod call
     */
    xdescribe('approve erc20 spending', () => {
      auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal moneod call
     */
    xdescribe('bid auction', () => {
      auctionTestFactory.prepare.auctionBidSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    describe('cancel auction', () => {
      auctionTestFactory.prepare.auctionCancelSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
    describe('settle auction', () => {
      auctionTestFactory.prepare.auctionSettleSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        'ONE',
      )
    })
  })
})
