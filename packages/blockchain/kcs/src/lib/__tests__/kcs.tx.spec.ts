import {
  erc20TestFactory,
  ganacheHelper,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
} from '@tatumio/shared-testing'
import { TatumKcsSDK } from '../kcs.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { kcsTxService } from '../services/kcs.tx'

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
})
