import {
  erc20TestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
  auctionTestFactory,
} from '@tatumio/shared-testing'
import { TatumEthSDK } from './eth.sdk'

describe('TatumEthSDK', () => {
  // const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const sdk = TatumEthSDK({ apiKey: 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb' })

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

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.ETH)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc20, TEST_DATA.ETH)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(sdk.transaction.erc20, TEST_DATA.ETH)
      })

      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc20, TEST_DATA.ETH)
      })

      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.ETH)
      })
    })
  })

  describe('auction', () => {
    describe('getAuction', () => {
      auctionTestFactory.getAuction(sdk.nft.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFee', () => {
      auctionTestFactory.getAuctionFee(sdk.nft.auction, TEST_DATA.ETH)
    })
    describe('getAuctionFeeRecipient', () => {
      auctionTestFactory.getAuctionFeeRecipient(sdk.nft.auction, TEST_DATA.ETH)
    })
    describe('update fee', () => {
      auctionTestFactory.updateFee(sdk.nft.auction, TEST_DATA.ETH)
    })
    describe('prepare', () => {
      describe('deploy auction', () => {
        auctionTestFactory.prepare.deployAuctionSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('create auction', () => {
        auctionTestFactory.prepare.createAuctionSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('update auction fee recipient', () => {
        auctionTestFactory.prepare.auctionUpdateFeeRecipientSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('approve nft spending', () => {
        auctionTestFactory.prepare.auctionApproveNftTransferSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('approve erc20 spending', () => {
        auctionTestFactory.prepare.auctionApproveErc20TransferSignedTransaction(
          sdk.nft.auction,
          TEST_DATA.ETH,
        )
      })
      describe('bid auction', () => {
        auctionTestFactory.prepare.auctionBidSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('cancel auction', () => {
        auctionTestFactory.prepare.auctionCancelSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
      describe('settle auction', () => {
        auctionTestFactory.prepare.auctionSettleSignedTransaction(sdk.nft.auction, TEST_DATA.ETH)
      })
    })
  })
})
