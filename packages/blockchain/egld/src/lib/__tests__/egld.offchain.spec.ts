import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '../egld.sdk'

describe('Offchain - tx', () => {
  const sdk = TatumEgldSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  const testData = TEST_DATA.EGLD
  // skiped because account doesn't have balance
  it.skip('should send offchain transaction', async () => {
    const tx = await sdk.offchain.send({
      address: testData.ADDRESS_0,
      privateKey: testData.PRIVATE_KEY_0,
      amount: '0.001',
      gasPrice: '200',
      gasLimit: '60000',
      senderAccountId: '624dd1f35472c7eb5c73eb09',
    })

    expect(tx).toBeDefined()
  })
})
