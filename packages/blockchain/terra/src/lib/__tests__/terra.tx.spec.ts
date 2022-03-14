import '@tatumio/shared-testing-common'
import { terraTxService } from '../services/terra.tx'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')

describe('TerraSDK - TX', () => {
  const txService = terraTxService({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY, provider: 'https://bombay-lcd.terra.dev' })

  const PRIVATE_KEY = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902b'
  const PRIVATE_KEY_WRONG = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902d'
  const ACCOUNT = 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn'
  const AMOUNT = '0.0001'
  const VALID_TX_DATA =
    '0a8d010a8a010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126a0a2c746572726131346730326338356b766477716378747974757073716b736e70343874787a38337138707a686e122c746572726131346730326338356b766477716378747974757073716b736e70343874787a38337138707a686e1a0c0a05756c756e61120331303012520a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235'
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {

      const signed = await txService.prepare(true, {
        fromPrivateKey: PRIVATE_KEY,
        amount: AMOUNT,
        to: ACCOUNT,
        currency: Currency.LUNA,
      })

      expect(signed.startsWith(VALID_TX_DATA)).toBeTruthy()
    })

    it('secret does not match', async () => {

      await expect(
        txService.prepare(true, {
          fromPrivateKey: PRIVATE_KEY_WRONG,
          currency: Currency.LUNA,
          amount: AMOUNT,
          to: ACCOUNT,
        }),
      ).rejects.toThrow()
    })
  })
})
