import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { polygonTxService } from '../services/polygon.tx'
import { TatumPolygonSDK } from '../polygon.sdk'
import { erc20TestFactory, ganacheHelper } from '@tatumio/shared-testing-evm-based'

const blockchain = Blockchain.POLYGON

describe('PolygonSDK - tx', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const polygonTx = polygonTxService({
    blockchain,
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

  // @TODO Deploy contract
  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.POLYGON)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
      })
    })
  })
})
