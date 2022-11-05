import { TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '../algo.sdk'
import { TransactionHash, TransferAlgorandBlockchain } from '@tatumio/api-client'

describe('AlgoSDK - tx', () => {
  const sdk = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  describe('ALGO', () => {
    const testData = TEST_DATA.ALGO.TESTNET

    // @TODO missing assets
    it.skip('should prepare ALGO signed transaction', async () => {
      const { txId } = (await sdk.transaction.signedTransaction(
        {
          from: testData.ADDRESS_0,
          fromPrivateKey: testData.PRIVATE_KEY_0,
          to: testData.ADDRESS_100,
          amount: '0.001',
          fee: '0.001',
        } as TransferAlgorandBlockchain,
        true,
      )) as TransactionHash

      expect(txId).toBeDefined()
    })
  })
})
