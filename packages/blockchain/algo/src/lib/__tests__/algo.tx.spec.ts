import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '../algo.sdk'
import { TransactionHash, TransferAlgorandBlockchain } from '@tatumio/api-client'

describe('AlgoSDK - tx', () => {
  const sdk = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('ALGO', () => {
    const testData = TEST_DATA.ALGO.TESTNET

    // @TODO missing assets
    it.skip('should prepare ALGO signed transaction', async () => {
      const { txId } = (await sdk.transaction.send.signedTransaction(
        {
          from: testData.ADDRESS_0,
          fromPrivateKey: testData.PRIVATE_KEY_0,
          to: testData.ADDRESS_100,
          amount: '0.1',
          fee: '0.001',
        } as TransferAlgorandBlockchain,
        true,
      )) as TransactionHash

      expect(txId).toBeDefined()
    })
  })
})
