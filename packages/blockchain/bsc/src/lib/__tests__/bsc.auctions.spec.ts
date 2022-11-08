import { auctionTestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import { bscAuctionService } from '../services/bsc.auction'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '../bsc.sdk'

const blockchain = Blockchain.BSC

describe('BscSDK - auctions', () => {
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  const auctionService = bscAuctionService({
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
        blockchain,
      )
    })
    describe('create auction', () => {
      auctionTestFactory.prepare.createAuctionSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    describe('update auction fee recipient', () => {
      auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    describe('approve nft spending', () => {
      auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal mbscod call
     */
    xdescribe('approve erc20 spending', () => {
      auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    /**
     * TODO: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     * after decimal mbscod call
     */
    xdescribe('bid auction', () => {
      auctionTestFactory.prepare.auctionBidSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    describe('cancel auction', () => {
      auctionTestFactory.prepare.auctionCancelSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
    describe('settle auction', () => {
      auctionTestFactory.prepare.auctionSettleSignedTransaction(
        auctionService,
        inmemoryBlockchain.accounts,
        blockchain,
      )
    })
  })
})
