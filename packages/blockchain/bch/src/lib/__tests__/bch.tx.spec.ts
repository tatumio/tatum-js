import '@tatumio/shared-testing-common'
import { bchTransactions } from '../bch.sdk.tx'
import * as apiClient from '@tatumio/api-client'
import { BchTx, BtcTransactionFromUTXO } from '@tatumio/api-client'
import { mockHelper } from '@tatumio/shared-testing-common'
import { oldBtcBasedTxTestFactory } from '@tatumio/shared-testing-btc-based'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('BCH transactions', () => {
  const UTXO_AMOUNT = 0.3786728
  const VALID_AMOUNT = 0.3769944
  const ADDRESS = 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5'
  const VALID_TX_DATA =
    '0200000001f3895ebe9444637901b0f7bd510564baa73c89bc2c480a5bc594dc626649766300000000644185c688866fcabfb021f9b6d90f203dfc29e483b45853ad6b87ce91a6112d6cf2323af053c60dde98a5e00bf1ad7a8243733a23625fb89bc20b83614173513172412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff01703f3f02000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
  const TX_HASH = '6376496662dc94c55b0a482cbc893ca7ba640551bdf7b00179634494be5e89f3'
  const PRIVATE_KEY = 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'

  const transactions = bchTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('From UTXO', () => {
    oldBtcBasedTxTestFactory.fromUTXO({
      transactions,
      data: {
        validAmount: VALID_AMOUNT,
        utxoAmount: UTXO_AMOUNT,
        validTxData: VALID_TX_DATA,
      },
      skipTest: {
        txNotFound: true,
      },
      mock: {
        requestGetRawTx: mockRequestGetRawTx,
        requestGetUtxo: () => {}, //TODO
        requestGetUtxoNotFound: () => {}, //TODO
        broadcast: mockedApi.blockchain.bcash.bchBroadcast,
      },
      getRequestBodyFromUTXO,
    })
  })

  function getRequestBodyFromUTXO(amount: number, index = 0): BtcTransactionFromUTXO {
    return {
      fromUTXO: [
        {
          txHash: TX_HASH,
          index,
          privateKey: PRIVATE_KEY,
        },
      ],
      to: [
        {
          address: ADDRESS,
          value: amount,
        },
      ],
    }
  }

  function mockRequestGetRawTx(
    obj: BchTx = {
      vout: [
        {
          value: UTXO_AMOUNT.toString(),
          n: 0,
          scriptPubKey: {
            addresses: [ADDRESS],
          },
        },
      ],
    },
  ) {
    mockedApi.blockchain.bcash.bchGetRawTransaction.mockResolvedValue(obj)
  }

  function mockRequestGetRawTxNotFound() {
    mockedApi.blockchain.bcash.bchGetRawTransaction.mockRejectedValue(mockHelper.apiError.notFound())
  }
})
