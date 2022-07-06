import '@tatumio/shared-testing-common'
import { ltcTransactions } from './ltc.tx'
import { mockHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { LtcTx, LtcUTXO } from '@tatumio/api-client'
import {
  BtcBasedInvalidTestParams,
  BtcBasedMocks,
  BtcBasedTestParams,
  btcBasedTxTestFactory,
} from '@tatumio/shared-testing-btc-based'
import { amountUtils } from '@tatumio/shared-abstract-sdk'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('LTC transactions', () => {
  const MNEMONIC =
    'avoid girl invest client improve team glare coyote acid pepper skin trim sword exotic submit valve trim mesh sick curtain void pride feature helmet'
  const XPUB =
    'ttub4gaFAtLZqn91CFTEK2uo7sb1uS1CRbV4HsgXt8kyj4znapofFNtfgc442UMuSiVNSJyGuD7zmaH1tSMfq3eHh3qmcjfQ2w6rZQ1KWfeNQSp'

  const ADDRESS_0 = 'mzj9PEnd212qJVBkNfcBYWg5fmn5UadTHJ'
  const PRIVATE_KEY_0 = 'cSCaeFG5DTAMKsu7TGEQ4z9DyTuuzCyhNEg6V488yMevrEsUbitB'

  const PRIVATE_KEY_1 = 'cW8xsxXNaoypuDVEwzkWf95g6BW5xriEi3dwjLZBrWT6SpBYPiQ3'
  const ADDRESS_1 = 'n3mFijfZdqE5ERrGzRVTrYDXee2M2oUu9H'

  const TX_HASH = 'edcb21782fbb444606e7140865aa761ad6a9ea1816a46fb9238d51a09d3e27f1'
  const UTXO_SCRIPT = '76a914d2b8a36d6617bf9b9b3a92ffaed0cec09043726488ac'

  const UTXO_AMOUNT = 1
  const VALID_AMOUNT = 0.29
  const FEE_AMOUNT = 0.0015

  const VALID_TX_DATA =
    '0200000001f1273e9da0518d23b96fa41618eaa9d61a76aa650814e7064644bb2f7821cbed000000006a47304402206fad48' +
    '00705f468857706376e541a86f3f0a4ba08edb34a4019bfd5cf2cd0a3d02204516d7f9ad03b3226c33b7180e3e566451b74a' +
    '27f204e3911e2c209748d2ddbb01210389f240a36df7ad7243cc9afdd0a549a359cc8a5d831ae117cec5ab5588a507e6ffff' +
    'ffff024081ba01000000001976a914f40723076a89c0aaad77def7768e1dbc6c070fd288acd0153904000000001976a914d2' +
    'b8a36d6617bf9b9b3a92ffaed0cec09043726488ac00000000'

  const transactions = ltcTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mock: BtcBasedMocks = {
    requestGetRawTx: mockRequestGetRawTx,
    requestGetUtxo: mockRequestGetUtxo,
    requestGetUtxoNotFound: mockRequestGetUtxoNotFound,
    requestGetTxByAddress: mockRequestGetTxByAddress,
    broadcast: mockedApi.blockchain.ltc.ltcBroadcast,
  }

  const data: BtcBasedTestParams = {
    fromAmount: UTXO_AMOUNT,
    fromAddress: ADDRESS_0,
    fromPrivateKey: PRIVATE_KEY_0,
    fromTxHash: TX_HASH,
    fromIndex: 0,
    toAmount: VALID_AMOUNT,
    toAddress: ADDRESS_1,
    feeAmount: FEE_AMOUNT,
  }

  const invalid = {
    invalidAmounts: [-1, -1.11111111, 0.0000000001, 9999.999999999],
    invalidKey: PRIVATE_KEY_1,
  } as BtcBasedInvalidTestParams

  describe('From UTXO', () => {
    btcBasedTxTestFactory.fromUTXO({
      transactions,
      data,
      validate: {
        txData: VALID_TX_DATA,
      },
      mock,
    })
    btcBasedTxTestFactory.fromUTXOInvalid({
      transactions,
      data,
      validate: {
        txData: VALID_TX_DATA,
      },
      invalid,
      mock,
    })
  })

  describe('From Address', () => {
    btcBasedTxTestFactory.fromAddress({
      transactions,
      data,
      validate: {
        txData: VALID_TX_DATA,
      },
      mock,
    })

    btcBasedTxTestFactory.fromAddressInvalidAmount({
      transactions,
      data,
      invalid,
      mock,
    })
  })

  function mockRequestGetRawTx(
    obj: LtcTx = {
      outputs: [
        {
          value: UTXO_AMOUNT.toString(),
          script: UTXO_SCRIPT,
          address: ADDRESS_0,
        },
        {
          value: '11254.98177740',
          script: 'a914c15acd1ea3f16a6d9dd02b5dc6964dc01294ca9387',
          address: 'QeEMJJZKbP4XLG8XoM82vsoMBnUbj6cYLb',
        },
      ],
    },
  ) {
    mockedApi.blockchain.ltc.ltcGetRawTransaction.mockResolvedValue(obj)
  }

  function mockRequestGetUtxo(
    obj: LtcUTXO = {
      hash: TX_HASH,
      address: ADDRESS_0,
      value: amountUtils.toSatoshis(UTXO_AMOUNT),
      script: UTXO_SCRIPT,
      index: 0,
    },
  ) {
    mockedApi.blockchain.ltc.ltcGetUtxo.mockResolvedValue(obj)
  }

  function mockRequestGetUtxoNotFound() {
    mockedApi.blockchain.ltc.ltcGetUtxo.mockRejectedValue(mockHelper.apiError.notFound())
  }

  function mockRequestGetTxByAddress(
    obj: LtcTx = {
      hash: TX_HASH,
      outputs: [
        {
          value: UTXO_AMOUNT.toString(),
          script: '76a91401ece42befef00eb643febc32cb0764563fb4e6988ac',
          address: ADDRESS_0,
        },
        {
          value: '11254.98177740',
          script: 'a914c15acd1ea3f16a6d9dd02b5dc6964dc01294ca9387',
          address: 'QeEMJJZKbP4XLG8XoM82vsoMBnUbj6cYLb',
        },
      ],
    },
  ) {
    mockedApi.blockchain.ltc.ltcGetTxByAddress.mockResolvedValue([obj])
  }
})
