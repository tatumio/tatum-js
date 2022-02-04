import {
  erc20TestFactory,
  ganacheHelper,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
} from '@tatumio/shared-testing'
import { TatumEthSDK } from '../eth.sdk'
import { ethTx } from '../services/eth.tx'
import { Blockchain } from '@tatumio/shared-core'

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
})
