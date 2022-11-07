import { mockHelper, testHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { ApiServices, TransactionHash } from '@tatumio/api-client'
import { bchTransactions } from '../services/bch.sdk.tx'
import { tx1 } from './mocked.tx'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('BchSDK - tx', () => {
  const txService = bchTransactions({
    bchGetRawTransaction: ApiServices.blockchain.bcash.bchGetRawTransaction,
  })

  const HASH = 'c2f9e44d4cfdadb9a5269c242cff914ef57b14b053295f0a1ef76e85339282be'
  const INDEX = 1
  const TO_ADDRESS = 'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65'
  const FROM_ADDRESS = 'bchtest:qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl'
  const SIGNATURE_ID = 'f3c7234a4-e2bb-4e66-9g08-fef9b45ce772'
  const SIGNATURE_ID_INDEX = 0
  const VALID_DATA =
    '0200000001be829233856ef71e0a5f2953b0147bf54e91ff2c249c26a5b9adfd4c4de4f9c20100000000ffffffff0240420f00000000001976a914ada119a49237d2915c053935a7e00f74e486652a88ac009f2400000000001976a914e831bb079ba85eb9013773b7023ee8c482a62f8f88ac00000000:[3500000]'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockedApi.blockchain.bcash.bchBroadcast.mockResolvedValue({ txId: '12345' })
      mockedApi.blockchain.bcash.bchGetRawTransaction.mockResolvedValue(tx1)

      const result = (await txService.sendTransaction(
        {
          fromUTXO: [
            {
              txHash: HASH,
              index: INDEX,
              signatureId: SIGNATURE_ID,
              signatureIdIndex: SIGNATURE_ID_INDEX,
            },
          ],
          to: [
            {
              address: FROM_ADDRESS,
              value: 0.01,
            },
            {
              address: TO_ADDRESS,
              value: 0.024,
            },
          ],
        },
        { testnet: true },
      )) as TransactionHash

      expect(result.txId).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.bcash.bchBroadcast)
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      const result = await txService.prepareSignedTransaction(
        {
          fromUTXO: [
            {
              txHash: HASH,
              index: INDEX,
              signatureId: SIGNATURE_ID,
              signatureIdIndex: SIGNATURE_ID_INDEX,
            },
          ],
          to: [
            {
              address: FROM_ADDRESS,
              value: 0.01,
            },
            {
              address: TO_ADDRESS,
              value: 0.024,
            },
          ],
        },
        { testnet: true },
      )

      expect(result).toBe(VALID_DATA)
    })
  })
})
