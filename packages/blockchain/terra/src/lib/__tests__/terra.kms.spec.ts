import '@tatumio/shared-testing-common'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'
import { terraKmsService } from '../services/terra.kms'
import { Blockchain } from '@tatumio/shared-core'
import { Tx } from '@terra-money/terra.js'

jest.mock('@tatumio/api-client')

describe('TerraSDK - KMS', () => {
  const kmsService = terraKmsService({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://bombay-lcd.terra.dev',
    blockchain: Blockchain.TERRA,
  })

  const PRIVATE_KEY = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902c'
  const FROM = 'terra1rul2sap2ynaywwecfsf3jm7uzql4x92rce7qam'
  const ACCOUNT = 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn'
  const AMOUNT = '0.0001'
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

      const tx = Tx.fromBuffer(Buffer.from(signed, 'hex'))
      expect(tx.auth_info.signer_infos).toHaveLength(1)
      expect(tx.body.memo).toBe('')
      expect(tx.body.messages).toHaveLength(1)
      expect(tx.body.messages[0]['from_address']).toBe(FROM)
      expect(tx.body.messages[0]['to_address']).toBe(ACCOUNT)
      expect(tx.body.messages[0]['amount']._coins.uluna.denom).toBe('uluna')
    })
  })
})
