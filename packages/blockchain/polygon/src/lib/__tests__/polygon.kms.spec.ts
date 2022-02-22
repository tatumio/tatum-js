import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumPolygonSDK } from '../polygon.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { ganacheHelper, kmsTestFactory } from '@tatumio/shared-testing-evm-based'
import { polygonKmsService } from '../services/polygon.kms'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.POLYGON

describe('polygonSDK - kms', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const polygonKms = polygonKmsService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      getGasPriceInWei: sdk.getGasPriceInWei,
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('sign', () => {
    kmsTestFactory.sign(polygonKms, TEST_DATA.POLYGON, Currency.MATIC)
  })
})
