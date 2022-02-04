import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '../one.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { oneTxService } from '../services/one.tx'
import { erc20TestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'

const blockchain = Blockchain.HARMONY

describe('OneSDK - tx', () => {
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

  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.ONE)
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
    })
  })
})
