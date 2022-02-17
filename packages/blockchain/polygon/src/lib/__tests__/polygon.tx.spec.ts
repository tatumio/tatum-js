import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { polygonTxService } from '../services/polygon.tx'
import { TatumPolygonSDK } from '../polygon.sdk'
import {
  erc20TestFactory,
  ganacheHelper,
  erc721TestFactory,
  multiTokenTestFactory,
  smartContractTestFactory,
  custodialTestFactory,
  marketplaceTestFactory,
  nativeTestFactory,
} from '@tatumio/shared-testing-evm-based'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.POLYGON

describe('PolygonSDK - tx', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const polygonTx = polygonTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(polygonTx.native, inmemoryBlockchain.accounts)
    })
  })

  // @TODO Deploy contract
  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.POLYGON)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
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

  describe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('createMarketplaceListing', () => {
        marketplaceTestFactory.prepare.createMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('createMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.createMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.transaction.smartContract,
          TEST_DATA.POLYGON,
        )
      })
    })

    describe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.transaction.smartContract,
          TEST_DATA.POLYGON,
        )
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        custodialTestFactory.prepare.generateCustodialWalletSignedTransaction(
          sdk.transaction.custodial,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })
    })
  })
})
