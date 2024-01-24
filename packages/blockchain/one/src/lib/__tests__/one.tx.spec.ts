import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '../one.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { oneTxService } from '../services/one.tx'
import {
  custodialTestFactory,
  erc20TestFactory,
  erc721TestFactory,
  ganacheHelper,
  marketplaceTestFactory,
  multiTokenTestFactory,
  nativeTestFactory,
  smartContractTestFactory,
} from '@tatumio/shared-testing-evm-based'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.HARMONY

describe.skip('OneSDK - tx', () => {
  const sdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const oneTx = oneTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(oneTx.native, inmemoryBlockchain.accounts)
    })
  })

  describe('erc20', () => {
    describe.skip('decimals', () => {
      erc20TestFactory.decimals(sdk.erc20, TEST_DATA.ONE)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(oneTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(oneTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(oneTx.erc20, TEST_DATA.ONE)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(oneTx.erc20, TEST_DATA.ONE)
      })

      describe('mintProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintProvenanceSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('mintMultipleProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleProvenanceSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })
    })
  })

  describe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.ONE,
          'ONE',
          inmemoryBlockchain.accounts,
        )
      })

      describe('approveSpending', () => {
        marketplaceTestFactory.prepare.approveSpending(sdk.marketplace, inmemoryBlockchain.accounts, 'ONE')
      })

      describe('sellMarketplaceListing', () => {
        marketplaceTestFactory.prepare.sellMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ONE,
          'ONE',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ONE,
          'ONE',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.ONE,
          'ONE',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ONE,
          'ONE',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })
      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(sdk.nft, TEST_DATA.ONE)
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(
          sdk.multiToken,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.ONE,
          inmemoryBlockchain.accounts,
        )
      })
    })

    describe.skip('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.ONE,
        )
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      xdescribe('transfer from custodial wallet', () => {
        custodialTestFactory.prepare.transferFromCustodialWallet(sdk.custodial, TEST_DATA.ONE, 'ONE')
      })

      xdescribe('batch transfer from custodial wallet', () => {
        custodialTestFactory.prepare.batchTransferFromCustodialWallet(sdk.custodial, TEST_DATA.ONE, 'ONE')
      })

      xdescribe('approve from custodial wallet', () => {
        custodialTestFactory.prepare.approveFromCustodialWallet(sdk.custodial, TEST_DATA.ONE, 'ONE')
      })

      xdescribe('generate batch custodial wallet', () => {
        custodialTestFactory.prepare.custodialWalletBatch(sdk.custodial, TEST_DATA.ONE, 'ONE')
      })
    })
  })
})
