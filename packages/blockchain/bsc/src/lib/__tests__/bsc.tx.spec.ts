import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '../bsc.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { bscTxService } from '../services/bsc.tx'
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

describe('BscSDK - tx', () => {
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(Blockchain.BSC)

  const bscTx = bscTxService({
    blockchain: Blockchain.BSC,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(bscTx.native, inmemoryBlockchain.accounts)
    })
  })

  describe('erc20', () => {
    /**
     * TODO:
     *  Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     */
    xdescribe('decimals', () => {
      erc20TestFactory.decimals(sdk.erc20, TEST_DATA.BSC)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(bscTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(bscTx.erc20, inmemoryBlockchain.accounts)
      })

      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(bscTx.erc20, TEST_DATA.BSC)
      })

      /**
       * TODO:
       *  Invalid JSON RPC response: "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body>\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n</body>\r\n</html>\r\n"
       */
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.erc20, TEST_DATA.BSC)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.nft,
          TEST_DATA.BSC,
          Currency.BSC,
        )
      })

      describe('mintProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintProvenanceSignedTransaction(sdk.nft, TEST_DATA.BSC, Currency.BSC)
      })

      describe('mintMultipleProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleProvenanceSignedTransaction(
          sdk.nft,
          TEST_DATA.BSC,
          Currency.BSC,
        )
      })
    })
  })

  describe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.BSC,
          'BSC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('approveSpending', () => {
        marketplaceTestFactory.prepare.approveSpending(sdk.marketplace, inmemoryBlockchain.accounts)
      })

      describe('sellMarketplaceListing', () => {
        marketplaceTestFactory.prepare.sellMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.BSC,
          'BSC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.BSC,
          'BSC',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.BSC,
          'BSC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.BSC,
          'BSC',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(
          bscTx.multiToken,
          TEST_DATA.BSC,
          'BSC',
        )
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(bscTx.multiToken, TEST_DATA.BSC, 'BSC')
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.BSC,
        )
      })
    })

    xdescribe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.BSC,
        )
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      describe('transfer from custodial wallet', () => {
        custodialTestFactory.prepare.transferFromCustodialWallet(sdk.custodial, TEST_DATA.BSC, 'BSC')
      })

      describe('batch transfer from custodial wallet', () => {
        custodialTestFactory.prepare.batchTransferFromCustodialWallet(sdk.custodial, TEST_DATA.BSC, 'BSC')
      })

      // Returned error: execution reverted
      xdescribe('approve from custodial wallet', () => {
        custodialTestFactory.prepare.approveFromCustodialWallet(sdk.custodial, TEST_DATA.BSC, 'BSC')
      })

      describe('generate batch custodial wallet', () => {
        custodialTestFactory.prepare.custodialWalletBatch(sdk.custodial, TEST_DATA.BSC, 'BSC')
      })
    })
  })
})
