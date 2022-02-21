import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '../bsc.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { ganacheHelper, kmsTestFactory } from '@tatumio/shared-testing-evm-based'
import { bscKmsService } from '../services/bsc.kms'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.BSC

describe('BscSDK - kms', () => {
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const bscKms = bscKmsService({
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
    kmsTestFactory.sign(bscKms, TEST_DATA.BSC, Currency.BSC)
  })
})
