import { OffchainTransactionResult } from '@tatumio/api-client'
import { expectHexString, REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '../egld.sdk'

describe('Virtual account - tx', () => {
  const sdk = TatumEgldSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  const testData = TEST_DATA.EGLD
  // skiped because account doesn't have balance
  // TODO find a way to fund the account
  it.skip('should send virtual account transaction', async () => {
    const tx = (await sdk.virtualAccount.send({
      address: testData.ADDRESS_0,
      privateKey: testData.PRIVATE_KEY_0,
      amount: '0.001',
      gasPrice: '200',
      gasLimit: '60000',
      senderAccountId: '624dd1f35472c7eb5c73eb09',
    })) as OffchainTransactionResult

    expect(tx.id).toBeDefined()
    expectHexString(tx.txId)
    expect(tx.completed).toBe(true)
  })
})
