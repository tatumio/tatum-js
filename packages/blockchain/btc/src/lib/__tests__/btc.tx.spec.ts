import '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { BtcTransactionFromAddress, BtcTransactionFromUTXO, BtcTx } from '@tatumio/api-client'
import { btcTransactions } from '../transaction/btc.tx'
import { btcBasedTxTestFactory, mockHelper } from '@tatumio/shared-testing'
import { amountUtils } from '@tatumio/shared-abstract-sdk'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('BTC transaction', () => {
  const UTXO_AMOUNT = 0.00016
  const VALID_AMOUNT = 0.00015
  const ADDRESS = 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr'
  const VALID_TX_DATA =
    '02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000'
  const TX_HASH = 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7'
  const PRIVATE_KEY = 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV'

  const transactions = btcTransactions()

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
        broadcast: mockedApi.blockchain.bitcoin.btcBroadcast,
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
        broadcast: mockedApi.blockchain.bitcoin.btcBroadcast,
      },
      getRequestBodyFromAddress,
    })
  })

  function getRequestBodyFromUTXO(amount: number): BtcTransactionFromUTXO {
    return {
      fromUTXO: [
        {
          txHash: TX_HASH,
          index: 0,
          privateKey: PRIVATE_KEY,
        },
      ],
      to: getRequestBodyTo(amount),
    }
  }

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

  function getRequestBodyTo(amount: number): BtcTransactionFromUTXO['to'] {
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
    mockedApi.blockchain.bitcoin.btcGetRawTransaction.mockResolvedValue(obj)
  }

  function mockRequestGetRawTxNotFound() {
    mockedApi.blockchain.bitcoin.btcGetRawTransaction.mockRejectedValue(mockHelper.apiError.notFound())
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
    mockedApi.blockchain.bitcoin.btcGetTxByAddress.mockResolvedValue([obj])
  }
})
