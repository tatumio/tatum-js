import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '../bsc.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { bscTxService } from '../services/bsc.tx'
import { erc20TestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'

describe('BscSDK - tx', () => {
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(Blockchain.BSC)

  const bscTx = bscTxService({
    blockchain: Blockchain.POLYGON,
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
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.BSC)
    })

    describe('prepare', () => {
      xdescribe('deploySignedTransaction', () => {
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
        erc20TestFactory.prepare.burnSignedTransaction(sdk.transaction.erc20, TEST_DATA.BSC)
      })
    })
  })
})
