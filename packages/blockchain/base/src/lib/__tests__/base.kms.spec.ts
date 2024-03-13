import { expectHexString, REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumBaseSDK } from '../base.sdk'
import { Blockchain } from '@tatumio/shared-core'
import { ganacheHelper } from '@tatumio/shared-testing-evm-based'
import { baseKmsService } from '../services/base.kms'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.BASE

describe('BaseSDK - kms', () => {
  const sdk = TatumBaseSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)
  const baseKms = baseKmsService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      getGasPriceInWei: sdk.getGasPriceInWei,
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('kms', () => {
    describe('sign', () => {
      it('should sign kms transaction', async () => {
        const signedRawTx = await baseKms.sign(
          {
            serializedTransaction:
              '{"txData":{"fromAddress":[{"address":"0xe73f05a8b3b28e1afec4ab759101e79b28542440","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"0xfb99F8aE9b70A0C8Cd96aE665BBaf85A7E01a2ef","value":1}]},"privateKeysToSign":["0x254ac28e10916b3c2def004a37fec216649288ae71c8cac41faf106193263792"]}',
            hashes: ['b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0'],
            id: '60f67210baf4120bb057c1ce',
            chain: Currency.BASE,
          },
          TEST_DATA.BASE.TESTNET.PRIVATE_KEY_0,
          TEST_DATA.BASE.PROVIDER,
        )
        expectHexString(signedRawTx)
      })
    })
  })
})
