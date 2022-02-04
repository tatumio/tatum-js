import '@tatumio/shared-testing-common'
import { ltcTransactions } from './ltc.tx'
import { mockHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { BtcTransactionFromAddress, LtcTransactionUTXO, LtcTx } from '@tatumio/api-client'
import { btcBasedTxTestFactory } from '@tatumio/shared-testing-btc-based'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('LTC transactions', () => {
  const UTXO_AMOUNT = 0.3936445
  const VALID_AMOUNT = 0.2969944
  const TX_HASH = '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807'
  const ADDRESS = 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF'
  const PRIVATE_KEY = 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'
  const VALID_TX_DATA =
    '020000000107b82207b41ce255ba227719f93ff426dd49fb53986b843145d496ca07c770660100000000ffffffff01702dc501000000001976a91401ece42befef00eb643febc32cb0764563fb4e6988ac00000000'

  const transactions = ltcTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('From UTXO', () => {
    btcBasedTxTestFactory.fromUTXO({
      transactions,
      data: {
        validAmount: VALID_AMOUNT,
        validTxData: VALID_TX_DATA,
        utxoAmount: UTXO_AMOUNT,
      },
      mock: {
        requestGetRawTx: mockRequestGetRawTx,
        requestGetRawTxNotFound: mockRequestGetRawTxNotFound,
        broadcast: mockedApi.blockchain.ltc.ltcBroadcast,
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
        broadcast: mockedApi.blockchain.ltc.ltcBroadcast,
      },
      getRequestBodyFromAddress,
    })
  })

  function getRequestBodyFromAddress(amount: number): BtcTransactionFromAddress {
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

  function getRequestBodyFromUTXO(amount: number, index = 1): LtcTransactionUTXO {
    return {
      fromUTXO: [
        {
          txHash: TX_HASH,
          index,
          privateKey: PRIVATE_KEY,
        },
      ],
      to: getRequestBodyTo(amount),
    }
  }

  function getRequestBodyTo(amount: number): LtcTransactionUTXO['to'] {
    return [
      {
        address: ADDRESS,
        value: amount,
      },
    ]
  }

  function mockRequestGetRawTx(
    obj: LtcTx = {
      outputs: [
        {
          value: '0.00001',
          script: '76a914dffec839eba107e556d6c4f25f90765b3d10583288ac',
          address: 'n1wLCQTNYJZGgLbsehQ76HLYomFfnpxXwp',
        },
        {
          value: UTXO_AMOUNT.toString(),
          script: '76a91401ece42befef00eb643febc32cb0764563fb4e6988ac',
          address: ADDRESS,
        },
      ],
    },
  ) {
    mockedApi.blockchain.ltc.ltcGetRawTransaction.mockResolvedValue(obj)
  }

  function mockRequestGetRawTxNotFound() {
    mockedApi.blockchain.ltc.ltcGetRawTransaction.mockRejectedValue(mockHelper.apiError.notFound())
  }

  function mockRequestGetTxByAddress(
    obj: LtcTx = {
      hash: TX_HASH,
      outputs: [
        {
          value: '0.00001',
          script: '76a914dffec839eba107e556d6c4f25f90765b3d10583288ac',
          address: 'n1wLCQTNYJZGgLbsehQ76HLYomFfnpxXwp',
        },
        {
          value: UTXO_AMOUNT.toString(),
          script: '76a91401ece42befef00eb643febc32cb0764563fb4e6988ac',
          address: ADDRESS,
        },
      ],
    },
  ) {
    mockedApi.blockchain.ltc.ltcGetTxByAddress.mockResolvedValue([obj])
  }
})
