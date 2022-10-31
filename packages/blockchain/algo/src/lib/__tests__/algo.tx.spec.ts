import { TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '../algo.sdk'

describe('AlgoSDK - tx', () => {
  const sdk = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  describe('ALGO', () => {
    const testData = TEST_DATA.ALGO.TESTNET

    it('should prepare ALGO signed transaction', async () => {
      const tx = await sdk.transaction.prepare.signedTransaction(
        {
          account: testData.ADDRESS_0,
          privateKey: testData.PRIVATE_KEY_0,
          address: testData.ADDRESS_100,
          amount: '0.001',
          fee: '0.001',
        },
        true,
      )

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.receiver).toBe(testData.ADDRESS_100)
      expect(parsedTx.signature).toBeDefined()
    })
  })
})
