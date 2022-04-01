import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '../eth.sdk'
import { ethTx } from '../services/eth.tx'
import { Blockchain } from '@tatumio/shared-core'
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

const blockchain = Blockchain.ETH

describe('EthSDK - tx', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const ethTxService = ethTx({
    blockchain: blockchain,
    web3: {
      getClient: () => inmemoryBlockchain.web3,
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
      nativeTestFactory.prepare.transferSignedTransaction(ethTxService.native, inmemoryBlockchain.accounts)
    })
  })

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.erc20, TEST_DATA.ETH)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(ethTxService.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(ethTxService.erc20, inmemoryBlockchain.accounts)
      })

      // TODO:  Returned error: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(ethTxService.erc20, TEST_DATA.ETH)
      })

      // TODO:  Returned error: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.erc20, TEST_DATA.ETH)
      })
    })
  })

  describe('erc721', () => {
    jest.setTimeout(99999)
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintProvenanceSignedTransaction(sdk.nft, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintMultipleProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleProvenanceSignedTransaction(
          sdk.nft,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.nft,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })
    })
  })

  describe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.ETH,
          'ETH',
          inmemoryBlockchain.accounts,
        )
      })

      describe('approveSpending', () => {
        marketplaceTestFactory.prepare.approveSpending(sdk.marketplace, inmemoryBlockchain.accounts)
      })

      describe('sellMarketplaceListing', () => {
        marketplaceTestFactory.prepare.sellMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ETH,
          'ETH',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ETH,
          'ETH',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.ETH,
          'ETH',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.ETH,
          'ETH',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.ETH, 'ETH')
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.ETH,
        )
      })
    })

    describe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.ETH,
        )
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      xdescribe('transfer from custodial wallet', () => {
        custodialTestFactory.prepare.transferFromCustodialWallet(sdk.custodial, TEST_DATA.ETH, 'ETH')
      })

      xdescribe('batch transfer from custodial wallet', () => {
        custodialTestFactory.prepare.batchTransferFromCustodialWallet(sdk.custodial, TEST_DATA.ETH, 'ETH')
      })

      xdescribe('approve from custodial wallet', () => {
        custodialTestFactory.prepare.approveFromCustodialWallet(sdk.custodial, TEST_DATA.ETH, 'ETH')
      })

      xdescribe('generate batch custodial wallet', () => {
        custodialTestFactory.prepare.custodialWalletBatch(sdk.custodial, TEST_DATA.ETH, 'ETH')
      })
    })
  })
})
