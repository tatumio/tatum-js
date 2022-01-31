import { DeployNft, TransferNft } from '@tatumio/api-client'
import {
  erc20TestFactory,
  erc721TestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
} from '@tatumio/shared-testing'
import { TatumOneSDK } from './one.sdk'

describe('TatumOneSDK', () => {
  const sdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.ONE)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.ONE)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.ONE)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.ONE)
    })
  })

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.ONE)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc20, TEST_DATA.ONE)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(sdk.transaction.erc20, TEST_DATA.ONE)
      })

      fdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc20, TEST_DATA.ONE)
      })

      describe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.ONE)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ONE,
          DeployNft.chain.ONE,
        )
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ONE,
          TransferNft.chain.ONE,
        )
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc721, TEST_DATA.ONE)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc721, TEST_DATA.ONE)
      })
    })
  })
})
