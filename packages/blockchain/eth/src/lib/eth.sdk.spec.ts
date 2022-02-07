import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from './eth.sdk'
import { auctionTestFactory } from '@tatumio/shared-testing-evm-based'

describe('TatumEthSDK', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.ETH)
    })
  })

  xdescribe('auction', () => {
    describe('getAuction', () => {
      auctionTestFactory.getAuction(sdk.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFee', () => {
      auctionTestFactory.getAuctionFee(sdk.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFeeRecipient', () => {
      auctionTestFactory.getAuctionFeeRecipient(sdk.auction, TEST_DATA.ETH)
    })
    describe('update fee', () => {
      auctionTestFactory.updateFee(sdk.auction, TEST_DATA.ETH)
    })
    describe('prepare', () => {
      describe('deploy auction', () => {
        auctionTestFactory.prepare.deployAuctionSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('create auction', () => {
        auctionTestFactory.prepare.createAuctionSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('update auction fee recipient', () => {
        auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('approve nft spending', () => {
        auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('approve erc20 spending', () => {
        auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('bid auction', () => {
        auctionTestFactory.prepare.auctionBidSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('cancel auction', () => {
        auctionTestFactory.prepare.auctionCancelSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
      describe('settle auction', () => {
        auctionTestFactory.prepare.auctionSettleSignedTransaction(sdk.auction, TEST_DATA.ETH)
      })
    })
  })
})
