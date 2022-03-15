import '@tatumio/shared-testing-common'
import { terraTxService } from '../services/terra.tx'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'
import { Tx } from '@terra-money/terra.js'
import { terraClient } from '../services/terra.client'

jest.mock('@tatumio/api-client')
jest.setTimeout(15000)

describe('TerraSDK - TX', () => {
  const txService = terraTxService({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://bombay-lcd.terra.dev',
  })

  const PRIVATE_KEY = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902b'
  const PRIVATE_KEY_WRONG = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902d'
  const ACCOUNT = 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn'
  const AMOUNT = '0.0001'
  const MEMO = '123'
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      const signed = await txService.prepare(true, {
        fromPrivateKey: PRIVATE_KEY,
        amount: AMOUNT,
        to: ACCOUNT,
        memo: MEMO,
        currency: Currency.LUNA,
      })

      const tx = Tx.fromBuffer(Buffer.from(signed, 'hex'))
      expect(tx.auth_info.signer_infos).toHaveLength(1)
      expect(tx.body.memo).toBe(MEMO)
      expect(tx.body.messages).toHaveLength(1)
      expect(tx.body.messages[0]['from_address']).toBe(ACCOUNT)
      expect(tx.body.messages[0]['to_address']).toBe(ACCOUNT)
      expect(tx.body.messages[0]['amount']._coins.uluna.denom).toBe('uluna')

      const broadcasted = await terraClient({
        apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
        provider: 'https://bombay-lcd.terra.dev',
      }).getClient(true).tx.broadcast(tx)
      expect(broadcasted['code']).toBe(0)
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
