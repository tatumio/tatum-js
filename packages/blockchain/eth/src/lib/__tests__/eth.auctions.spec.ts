import {
  blockchainTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TestCasesApiCallMapping,
  TEST_DATA,
} from '@tatumio/shared-testing-common'
import { auctionTestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'
import { TatumEthSDK } from '../eth.sdk'
import * as apiClient from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { ethAuctionService } from '../services/eth.auction'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.BlockchainMarketplaceService, true)

const blockchain = Blockchain.ETH

fdescribe('EthSDK - auctions', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const auctionService = ethAuctionService({
    blockchain,
    web3: {
      getClient: () => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  describe('API methods', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    const auctionApiCalls = {
      getAuction: sdk.marketplace.auction.getAuction,
      getAuctionFee: sdk.marketplace.auction.getAuctionFee,
      getAuctionFeeRecipient: sdk.marketplace.auction.getAuctionFeeRecipient,
    }
    const testData = TEST_DATA.ETH

    const auctionFunctionsMapping: TestCasesApiCallMapping<typeof auctionApiCalls> = {
      getAuction: [mockedApi.getAuction, Blockchain.ETH, testData.TESTNET.CONTRACT_ADDRESS, '1'],
      getAuctionFee: [mockedApi.getAuctionFee, Blockchain.ETH, testData.TESTNET.CONTRACT_ADDRESS],
      getAuctionFeeRecipient: [
        mockedApi.getAuctionFeeRecipient,
        Blockchain.ETH,
        testData.TESTNET.CONTRACT_ADDRESS,
      ],
    }

    // TODO: It cannot handle first hardcoded params (ETH) in SDK
    xdescribe('API methods mapping', () => {
      blockchainTestFactory.apiMethods(auctionApiCalls, auctionFunctionsMapping)
    })
  })

  describe('prepare', () => {
    beforeEach(async () => {
      await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
    })

    fdescribe('deploy auction', () => {
      auctionTestFactory.prepare.deployAuctionSignedTransaction(auctionService, inmemoryBlockchain.accounts)
    })
    xdescribe('create auction', () => {
      auctionTestFactory.prepare.createAuctionSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    xdescribe('update auction fee recipient', () => {
      auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(
        sdk.marketplace.auction,
        TEST_DATA.ETH,
      )
    })
    xdescribe('approve nft spending', () => {
      auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(
        sdk.marketplace.auction,
        TEST_DATA.ETH,
      )
    })
    xdescribe('approve erc20 spending', () => {
      auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(
        sdk.marketplace.auction,
        TEST_DATA.ETH,
      )
    })
    xdescribe('bid auction', () => {
      auctionTestFactory.prepare.auctionBidSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    xdescribe('cancel auction', () => {
      auctionTestFactory.prepare.auctionCancelSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
    })
    xdescribe('settle auction', () => {
      auctionTestFactory.prepare.auctionSettleSignedTransaction(sdk.marketplace.auction, TEST_DATA.ETH)
    })
  })
})
