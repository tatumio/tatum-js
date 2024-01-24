import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { klaytnTxService } from '../services/klaytn.tx'
import { TatumKlaytnSDK } from '../sdk-klaytn'
import {
  erc20TestFactory,
  erc721TestFactory,
  ganacheHelper,
  marketplaceTestFactory,
  multiTokenTestFactory,
  nativeTestFactory,
} from '@tatumio/shared-testing-evm-based'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.KLAY

describe.skip('KlaytnSDK - tx', () => {
  const sdk = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const klaytnTx = klaytnTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '10'
      },
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(klaytnTx.native, inmemoryBlockchain.accounts)
    })
  })

  // @TODO Deploy contract
  describe('erc20', () => {
    describe('decimals', () => {
      // TODO: after live deployment
      // erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.KLAYTN)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(klaytnTx.erc20, inmemoryBlockchain.accounts)
        // erc20TestFactory.prepare.deploySignedTransactionChain(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(klaytnTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })
    })
  })

  xdescribe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      // Invalid JSON RPC response: {"code":1200503,"message":"error from node API; ","requestId":"b993772c-3427-4910-9b21-1a1fc5956f11"}
      xdescribe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(sdk.nft, TEST_DATA.KLAYTN)
      })
    })
  })

  xdescribe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.KLAYTN,
          'KLAY',
          inmemoryBlockchain.accounts,
        )
      })

      describe('approveSpending', () => {
        marketplaceTestFactory.prepare.approveSpending(sdk.marketplace, inmemoryBlockchain.accounts, 'KLAY')
      })

      describe('sellMarketplaceListing', () => {
        marketplaceTestFactory.prepare.sellMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.KLAYTN,
          'KLAY',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.KLAYTN,
          'KLAY',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.KLAYTN,
          'KLAY',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.KLAYTN,
          'KLAY',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.KLAYTN,
          inmemoryBlockchain.accounts,
        )
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(sdk.multiToken, TEST_DATA.KLAYTN)
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.KLAYTN)
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.KLAYTN,
          inmemoryBlockchain.accounts,
        )
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(
          sdk.multiToken,
          TEST_DATA.KLAYTN,
          inmemoryBlockchain.accounts,
        )
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(
          sdk.multiToken,
          TEST_DATA.KLAYTN,
          inmemoryBlockchain.accounts,
        )
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(
          sdk.multiToken,
          TEST_DATA.KLAYTN,
          inmemoryBlockchain.accounts,
        )
      })
    })
  })
})
