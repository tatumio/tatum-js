import '@tatumio/shared-testing-common'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'
import { terraKmsService } from '../services/terra.kms'
import { Blockchain } from '@tatumio/shared-core'

jest.mock('@tatumio/api-client')

describe('TerraSDK - KMS', () => {
  const kmsService = terraKmsService({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://bombay-lcd.terra.dev',
    blockchain: Blockchain.TERRA,
  })

  const PRIVATE_KEY = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902c'
  const ACCOUNT = 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn'
  const AMOUNT = '0.0001'
  const VALID_TX_DATA =
    '0a8d010a8a010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126a0a2c74657272613172756c3273617032796e617977776563667366336a6d37757a716c347839327263653771616d12'
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sign', () => {
    it('valid', async () => {
      const signed = await kmsService.sign(
        {
          id: '123',
          hashes: ['123'],
          serializedTransaction: JSON.stringify({
            amount: AMOUNT,
            to: ACCOUNT,
            currency: Currency.LUNA,
          }),
        },
        PRIVATE_KEY,
        true,
      )

      expect(signed.startsWith(VALID_TX_DATA)).toBeTruthy()
    })
  })
})
