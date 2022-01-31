import '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { BtcTx, ScryptaTransaction } from '@tatumio/api-client'
import { btcBasedTxTestFactory, mockHelper } from '@tatumio/shared-testing'
import { amountUtils } from '@tatumio/abstract-sdk'
import { scryptaTransactions } from '../scrypta.sdk.tx'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

/**
 * @TODO fix later
 */
describe.skip('TatumScryptaSDK - transactions', () => {
  const UTXO_AMOUNT = 0.03
  const VALID_AMOUNT = 0.02969944
  const ADDRESS = 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5'
  const VALID_TX_DATA =
    '0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa53000000006a473044022030aeec05dc9bfefe5e3c1d6d4ea7945c9648f20bede1c854c9cc018cc9e4d771022048c64fb22ae3208a9ba9418aed392bbc4aab28f0e333b3c8fab042da88d357f5012103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
  const TX_HASH = '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc'
  const PRIVATE_KEY = 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'

  const transactions = scryptaTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('From UTXO', () => {
    btcBasedTxTestFactory.fromUTXO({
      transactions,
      data: {
        validAmount: VALID_AMOUNT,
        utxoAmount: UTXO_AMOUNT,
        validTxData: VALID_TX_DATA,
      },
      mock: {
        requestGetRawTx: mockRequestGetRawTx,
        requestGetRawTxNotFound: mockRequestGetRawTxNotFound,
        broadcast: mockedApi.blockchain.scrypta.broadcastsignedScryptatransaction,
      },
      getRequestBodyFromUTXO,
    })
  })

  describe('From Address', () => {
    btcBasedTxTestFactory.fromAddress({
      transactions,
      data: {
        validAmount: VALID_AMOUNT,
        validTxData: VALID_TX_DATA,
        utxoAmount: UTXO_AMOUNT,
      },
      mock: {
        requestGetTxByAddress: mockRequestGetTxByAddress,
        broadcast: mockedApi.blockchain.scrypta.broadcastsignedScryptatransaction,
      },
      getRequestBodyFromAddress,
    })
  })

  function getRequestBodyFromUTXO(amount: number): ScryptaTransaction {
    return {
      fromUTXO: [
        {
          txHash: TX_HASH,
          index: '0',
          privateKey: PRIVATE_KEY,
        },
      ],
      to: getRequestBodyTo(amount),
    }
  }

  function getRequestBodyFromAddress(amount: number): ScryptaTransaction {
    return {
      fromAddress: [
        {
          address: ADDRESS,
          privateKey: PRIVATE_KEY,
        },
      ],
      to: getRequestBodyTo(amount),
    }
  }

  function getRequestBodyTo(amount: number): ScryptaTransaction['to'] {
    return [
      {
        address: ADDRESS,
        value: amount,
      },
    ]
  }

  function mockRequestGetRawTx(
    obj: BtcTx = {
      outputs: [
        {
          value: amountUtils.toSatoshis(UTXO_AMOUNT),
          address: ADDRESS,
        },
      ],
    },
  ) {
    mockedApi.blockchain.scrypta.getScryptaTransactionbyhash.mockResolvedValue(obj)
  }

  function mockRequestGetRawTxNotFound() {
    mockedApi.blockchain.scrypta.getScryptaTransactionbyhash.mockRejectedValue(mockHelper.apiError.notFound())
  }

  function mockRequestGetTxByAddress(
    obj: BtcTx = {
      hash: TX_HASH,
      outputs: [
        {
          value: amountUtils.toSatoshis(UTXO_AMOUNT),
          address: ADDRESS,
        },
      ],
    },
  ) {
    mockedApi.blockchain.scrypta.getScryptaTransactionsbyaddress.mockResolvedValue([obj])
  }
})
