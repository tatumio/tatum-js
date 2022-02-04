import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '../eth.sdk'
import { ethTx } from '../services/eth.tx'
import { Blockchain, Currency } from '@tatumio/shared-core'
import { erc20TestFactory, ganacheHelper, erc721TestFactory } from '@tatumio/shared-testing-evm-based'

const blockchain = Blockchain.ETH

describe('EthSDK - tx', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const ethTxService = ethTx({
    blockchain: blockchain,
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

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.ETH)
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
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.ETH)
      })
    })
  })

  describe('erc721', () => {
    jest.setTimeout(99999)
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc721, TEST_DATA.ETH, Currency.ETH)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc721, TEST_DATA.ETH, Currency.ETH)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc721, TEST_DATA.ETH, Currency.ETH)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.ETH,
          Currency.ETH,
        )
      })
    })
  })
})
