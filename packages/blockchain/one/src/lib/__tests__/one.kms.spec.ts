import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '../one.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { ganacheHelper, kmsTestFactory } from '@tatumio/shared-testing-evm-based'
import { oneKmsService } from '../services/one.kms'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.HARMONY

describe('OneSDK - kms', () => {
  const sdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const oneKms = oneKmsService({
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
    kmsTestFactory.sign(oneKms, TEST_DATA.ONE, Currency.ONE)
  })
})
