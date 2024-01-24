import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEonSDK } from './eon.sdk'

describe('TatumEonSDK', () => {
  const sdk = TatumEonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Web3', () => {
    describe('Get gas price in wei', () => {
      it('should return gas price', async () => {
        const gasPrice = await sdk.getGasPriceInWei()

        expect(gasPrice).toBeDefined()
        expect(parseInt(gasPrice)).toBeGreaterThan(0)
      })
    })
  })
})
