import { DeployNft, TransferNft } from '@tatumio/api-client'
import {
  erc20TestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
  erc721TestFactory,
} from '@tatumio/shared-testing'
import { TatumBscSDK } from './bsc.sdk'

describe('TatumBscSDK', () => {
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.BSC)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.BSC)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.BSC)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.BSC)
    })
  })

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.BSC)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc20, TEST_DATA.BSC)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(sdk.transaction.erc20, TEST_DATA.BSC)
      })

      describe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc20, TEST_DATA.BSC)
      })

      describe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.BSC)
      })
    })
  }),
    describe('erc721', () => {
      describe('prepare', () => {
        describe('deploySignedTransaction', () => {
          erc721TestFactory.prepare.deploySignedTransaction(
            sdk.transaction.erc721,
            TEST_DATA.BSC,
            DeployNft.chain.BSC,
          )
        })

        describe('transferSignedTransaction', () => {
          erc721TestFactory.prepare.transferSignedTransaction(
            sdk.transaction.erc721,
            TEST_DATA.BSC,
            TransferNft.chain.BSC,
          )
        })

        describe('mintSignedTransaction', () => {
          erc721TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc721, TEST_DATA.BSC)
        })

        describe('burnSignedTransaction', () => {
          erc721TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc721, TEST_DATA.BSC)
        })
      })
    })
})
