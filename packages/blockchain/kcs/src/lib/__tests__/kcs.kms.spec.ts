import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumKcsSDK } from '../kcs.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { ganacheHelper, kmsTestFactory } from '@tatumio/shared-testing-evm-based'
import { kcsKmsService } from '../services/kcs.kms'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.KCS

describe('KcsSDK - kms', () => {
  const sdk = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const kcsKms = kcsKmsService({
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
    kmsTestFactory.sign(kcsKms, TEST_DATA.KCS, Currency.KCS)
  })
})
