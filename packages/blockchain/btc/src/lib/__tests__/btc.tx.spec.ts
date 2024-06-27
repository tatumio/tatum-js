import '@tatumio/shared-testing-common'
import { mockHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { BtcTx, BtcUTXO, FeeBtcBased } from '@tatumio/api-client'
import {
  BtcBasedMocks,
  BtcBasedTestParams,
  btcBasedTxTestFactory,
  BtcBasedValidation,
} from '@tatumio/shared-testing-btc-based'
import { amountUtils } from '@tatumio/shared-abstract-sdk'
import { btcTransactions } from '../transaction/btc.tx'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('BTC transactions', () => {
  const MNEMONIC =
    'avoid girl invest client improve team glare coyote acid pepper skin trim ' +
    'sword exotic submit valve trim mesh sick curtain void pride feature helmet'
  const XPUB =
    'tpubDFb1E3zFBoYThBBhGtrVqPVSfmoRHDD5ci4yr75MRD7DrDhsfPUMk5VQZuB2stgp1zLwYv5X8ENLQgoyaMewJPr79HkgMojdeWfkE65ytN5'

  const ADDRESS_0 = 'tb1q62u2xmtxz7lehxe6jtl6a5xwczgyxunyl3vm06'
  const PRIVATE_KEY_0 = 'cSCaeFG5DTAMKsu7TGEQ4z9DyTuuzCyhNEg6V488yMevrEsUbitB'

  const PRIVATE_KEY_1 = 'cW8xsxXNaoypuDVEwzkWf95g6BW5xriEi3dwjLZBrWT6SpBYPiQ3'
  const ADDRESS_1 = 'tb1q7srjxpm238q24tthmmmhdrsah3kqwr7jq5y972'

  const TX_HASH = 'fef757bcc18bac04459b263375d2bba9dc2e740b8ccb944999c5eaba2cb809cc'
  const SIGNATURE_ID = '11111111-1111-1111-1111-111111111111'

  const UTXO_AMOUNT = 0.001
  const VALID_AMOUNT = 0.00035
  const FEE_AMOUNT = 0.000005

  const VALID_TX_DATA =
    '02000000000101cc09b82cbaeac5994994cb8c0b742edca9bbd27533269b4504ac8bc1bc57f7fe0100000000ffffffff02b8880000000000' +
    '00160014f40723076a89c0aaad77def7768e1dbc6c070fd2f4fb000000000000160014d2b8a36d6617bf9b9b3a92ffaed0cec09043726402' +
    '4830450221009ddf00d13f0f0c8e17342ebe64be66a265b64c91cececf55ce51925122d9e0460220749de459ea8bca886249cb4f11bf6bf1' +
    '0cd364483ce52ccbfefc88735e85ca8601210389f240a36df7ad7243cc9afdd0a549a359cc8a5d831ae117cec5ab5588a507e600000000'

  const SERIALIZED_TX_FOR_KMS =
    '{"hash":"8c348fe8487690b1f64cc0f9f33c2b1554d8ef3fad0e542afc465c31d58cb62f","version":2,' +
    '"inputs":[{"prevTxId":"fef757bcc18bac04459b263375d2bba9dc2e740b8ccb944999c5eaba2cb809cc","outputIndex":1,' +
    '"sequenceNumber":4294967295,"script":"","scriptString":"","output":{"satoshis":100000,' +
    '"script":"0014d2b8a36d6617bf9b9b3a92ffaed0cec090437264"}}],"outputs":[{"satoshis":35000,' +
    '"script":"0014f40723076a89c0aaad77def7768e1dbc6c070fd2"},{"satoshis":64500,' +
    '"script":"0014d2b8a36d6617bf9b9b3a92ffaed0cec090437264"}],"nLockTime":0}'

  const SERIALIZED_TX_FOR_KMS_WITH_CHANGE =
    '{"hash":"8c348fe8487690b1f64cc0f9f33c2b1554d8ef3fad0e542afc465c31d58cb62f","version":2,' +
    '"inputs":[{"prevTxId":"fef757bcc18bac04459b263375d2bba9dc2e740b8ccb944999c5eaba2cb809cc","outputIndex":1,' +
    '"sequenceNumber":4294967295,"script":"","scriptString":"","output":{"satoshis":100000,' +
    '"script":"0014d2b8a36d6617bf9b9b3a92ffaed0cec090437264"}}],"outputs":[{"satoshis":35000,' +
    '"script":"0014f40723076a89c0aaad77def7768e1dbc6c070fd2"},{"satoshis":64500,' +
    '"script":"0014d2b8a36d6617bf9b9b3a92ffaed0cec090437264"}],"nLockTime":0,' +
    '"changeScript":"OP_0 20 0xd2b8a36d6617bf9b9b3a92ffaed0cec090437264","changeIndex":1,"fee":500}'

  const validate: BtcBasedValidation = {
    txData: VALID_TX_DATA,
    txDtoSerialized: SERIALIZED_TX_FOR_KMS,
    txDtoSerializedWithChange: SERIALIZED_TX_FOR_KMS_WITH_CHANGE,
  }

  const transactions = btcTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mock: BtcBasedMocks = {
    requestGetRawTx: mockRequestGetRawTx,
    requestGetUtxo: mockRequestGetUtxo,
    requestGetUtxoNotFound: mockRequestGetUtxoNotFound,
    requestGetTransactionsNotFound: mockRequestGetTransactionsNotFound,
    requestGetUTXOsByAddress: mockRequestGetUTXOsByAddress,
    requestEstimateFee: mockRequestEstimateFee,
    broadcast: mockedApi.blockchain.bitcoin.btcBroadcast,
  }

  const data: BtcBasedTestParams = {
    fromAmount: UTXO_AMOUNT,
    fromAddress: ADDRESS_0,
    fromPrivateKey: PRIVATE_KEY_0,
    fromSignatureId: SIGNATURE_ID,
    fromTxHash: TX_HASH,
    fromIndex: 1,
    toAmount: VALID_AMOUNT,
    toAddress: ADDRESS_1,
    feeAmount: FEE_AMOUNT,
  }

  describe('From UTXO', () => {
    btcBasedTxTestFactory.fromUTXO({
      transactions,
      data,
      validate,
      mock,
    })
  })

  describe('From Address', () => {
    btcBasedTxTestFactory.fromAddress({
      transactions,
      data,
      validate,
      mock,
    })
  })

  function mockRequestGetRawTx(
    obj: BtcTx = {
      outputs: [
        {
          value: 17.61910726,
          address: 'tb1qm2ltp8mnz0vj84kvslhflaedj53p0srf6vdvh8',
        },
        {
          value: UTXO_AMOUNT,
          address: ADDRESS_0,
        },
      ],
    },
  ) {
    mockedApi.blockchain.bitcoin.btcGetRawTransaction.mockResolvedValue(obj)
  }

  function mockRequestGetUtxo(
    obj: BtcUTXO = {
      hash: TX_HASH,
      address: ADDRESS_0,
      value: amountUtils.toSatoshis(UTXO_AMOUNT),
      index: 1,
    },
  ) {
    mockedApi.blockchain.bitcoin.btcGetUtxo.mockResolvedValue(obj)
  }

  function mockRequestGetUtxoNotFound() {
    mockedApi.blockchain.bitcoin.btcGetUtxo.mockRejectedValue(mockHelper.apiError.notFound())
  }

  function mockRequestGetTransactionsNotFound() {
    mockedApi.blockchain.bitcoin.btcGetTxByAddress.mockResolvedValue([])
  }

  function mockRequestGetUTXOsByAddress(
    obj: any = {
      'txHash': TX_HASH,
      'index': 1,
      'value': UTXO_AMOUNT,
      'address': ADDRESS_0,
      'chain': 'bitcoin-testnet',
    },
  ) {
    if (obj === -1) {
      mockedApi.data.wallet.getUtxosByAddress.mockResolvedValue([])
    } else {
      mockedApi.data.wallet.getUtxosByAddress.mockResolvedValue([obj])
    }
  }

  function mockRequestEstimateFee(
    obj: FeeBtcBased = {
      slow: '0.000001',
      medium: '0.000002',
      fast: '0.000003',
    },
  ) {
    mockedApi.fee.estimateFeeBlockchain.mockResolvedValue(obj)
  }
})
