import '@tatumio/shared-testing'
import { bchTransactions } from '../transaction/bch.tx'
import * as apiClient from '@tatumio/api-client'
import { BchTx, BtcTransactionFromUTXO } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/abstract-sdk'
import { testHelper } from '@tatumio/shared-testing'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BCH transactions', () => {
  const ADDRESS = 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5'
  const VALID_TX_DATA =
    '0200000001f3895ebe9444637901b0f7bd510564baa73c89bc2c480a5bc594dc626649766300000000644185c688866fcabfb021f9b6d90f203dfc29e483b45853ad6b87ce91a6112d6cf2323af053c60dde98a5e00bf1ad7a8243733a23625fb89bc20b83614173513172412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff01703f3f02000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
  const TX_HASH = '6376496662dc94c55b0a482cbc893ca7ba640551bdf7b00179634494be5e89f3'
  const PRIVATE_KEY = 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'

  const transactions = bchTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockRequestGetRawTx()

      mockedApi.blockchain.bcash.bchBroadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

      const result = await transactions.sendTransaction(getRequestBodyFromUTXO(0.3769944), {
        testnet: true,
      })
      expect(result.txId).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.bcash.bchBroadcast, [{ txData: VALID_TX_DATA }])
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      mockRequestGetRawTx()
      const txData = await transactions.prepareSignedTransaction(getRequestBodyFromUTXO(0.3769944), {
        testnet: true,
      })
      expect(txData).toBe(VALID_TX_DATA)
    })

    it('fee = 0', async () => {
      mockRequestGetRawTx()

      await expect(
        transactions.prepareSignedTransaction(getRequestBodyFromUTXO(0.1), {
          testnet: true,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_FEE_IS_TOO_LARGE)
    })

    it('no outputs', async () => {
      mockRequestGetRawTx({
        vout: [],
      })

      await expect(
        transactions.prepareSignedTransaction(getRequestBodyFromUTXO(0.3786728), {
          testnet: true,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_UTXO_NOT_FOUND)
    })

    it('wrong output index', async () => {
      mockRequestGetRawTx()

      await expect(
        transactions.prepareSignedTransaction(getRequestBodyFromUTXO(0.3786728, 1), {
          testnet: true,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_UTXO_NOT_FOUND)
    })
  })

  const getRequestBodyFromUTXO = (amount: number, index = 0): BtcTransactionFromUTXO => ({
    fromUTXO: [
      {
        txHash: TX_HASH,
        index,
        privateKey: PRIVATE_KEY,
      },
    ],
    to: getRequestBodyTo(amount),
  })

  const getRequestBodyTo = (amount: number): BtcTransactionFromUTXO['to'] => [
    {
      address: ADDRESS,
      value: amount,
    },
  ]

  const mockRequestGetRawTx = (
    obj: BchTx = {
      vout: [
        {
          value: '0.3786728',
          n: 0,
          scriptPubKey: {
            addresses: [ADDRESS],
          },
        },
      ],
    },
  ) => {
    mockedApi.blockchain.bcash.bchGetRawTransaction.mockReturnValue(Promise.resolve(obj))
  }
})
