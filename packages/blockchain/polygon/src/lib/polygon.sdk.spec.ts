import { BurnNft, DeployNft, MintNft, TransferNft } from '@tatumio/api-client'
import { Currency } from '@tatumio/shared-core'
import {
  erc20TestFactory,
  erc721TestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
} from '@tatumio/shared-testing'
import { TatumPolygonSDK } from './polygon.sdk'

describe('TatumPolygonSDK', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.POLYGON)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.POLYGON)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.POLYGON)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.POLYGON)
    })
  })

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.POLYGON)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc20, TEST_DATA.POLYGON)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(sdk.transaction.erc20, TEST_DATA.POLYGON)
      })

      describe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc20, TEST_DATA.POLYGON)
      })

      describe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.POLYGON)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.POLYGON,
          Currency.MATIC,
        )
      })
    })
  })
})
