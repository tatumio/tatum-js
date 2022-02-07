import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumKcsSDK } from '../kcs.sdk'
import { Blockchain, Currency } from '@tatumio/shared-core'
import { kcsTxService } from '../services/kcs.tx'
import { erc20TestFactory, ganacheHelper, erc721TestFactory } from '@tatumio/shared-testing-evm-based'
const blockchain = Blockchain.KCS

describe('KcsSDK - tx', () => {
  const sdk = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const kcsTx = kcsTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  describe('erc20', () => {
    /**
     * TODO:
     *  Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
     */
    xdescribe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.KCS)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(kcsTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(kcsTx.erc20, inmemoryBlockchain.accounts)
      })

      /**
       * TODO:
       *  Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
       */
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(kcsTx.erc20, TEST_DATA.KCS)
      })

      /**
       * TODO:
       *  Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
       */
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(kcsTx.erc20, TEST_DATA.KCS)
      })
    })
  })

  describe('erc721', () => {
    jest.setTimeout(99999)
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.transaction.erc721, TEST_DATA.KCS, Currency.KCS)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KCS,
          Currency.KCS,
        )
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.transaction.erc721, TEST_DATA.KCS, Currency.KCS)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc721, TEST_DATA.KCS, Currency.KCS)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KCS,
          Currency.KCS,
        )
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KCS,
          Currency.KCS,
        )
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KCS,
          Currency.KCS,
        )
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KCS,
          Currency.KCS,
        )
      })
    })
  })
})
