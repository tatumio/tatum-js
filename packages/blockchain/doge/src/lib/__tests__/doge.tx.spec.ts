import { DogeTransactionAddress, dogeTransactions } from '../doge.sdk.tx'
import { mockHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { DogeTransactionUTXO, DogeUTXO } from '@tatumio/api-client'
import { oldBtcBasedTxTestFactory } from '@tatumio/shared-testing-btc-based'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('DOGE transactions', () => {
  const TX_HASH = 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5'
  const PRIVATE_KEY = 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1'
  const TO_ADDRESS = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
  const ADDRESS = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
  const UTXO_AMOUNT = 60.0819
  const VALID_ADDRESS_AMOUNT = 100
  const VALID_AMOUNT = 58
  const VALID_TX_ADDRESS_DATA = '0100000001765b4f02260b37447d795f342c1e7023ff27b53413aa352678c0c1b8a78bc294010000006a473044022021628a76ddfd8a211b45101a59bd317be6c08a3a11a045b0da34c36ccfa5c7e202204a2ecfd90ba00f8d12a7407b1c180bb182ab72f5fc5fa345adfda4aedbfbab20012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff010003164e020000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
  const VALID_TX_DATA =
    '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('From UTXO', () => {
    oldBtcBasedTxTestFactory.fromUTXO({
      transactions: dogeTransactions(),
      data: {
        validAmount: VALID_AMOUNT,
        utxoAmount: UTXO_AMOUNT,
        validTxData: VALID_TX_DATA,
      },
      mock: {
        requestGetRawTx: () => {
        },
        requestGetUtxo: () => {
        },
        requestGetUtxoNotFound: () => {
        },
        broadcast: mockedApi.blockchain.doge.dogeBroadcast,
      },
      getRequestBodyFromUTXO,
      skipTest: {
        noOutputs: true,
        txNotFound: true,
      },
    })
  })

  describe('From Address', () => {
    const requestGetTxByAddress = () => ([{
      'blockNumber': 4309669,
      'fee': '0.00226',
      'hash': '94c28ba7b8c1c0782635aa1334b527ff23701e2c345f797d44370b26024f5b76',
      'hex': '0100000001152fbe9d3d9770f9002aa4799e5cfbad48f6676842b394116c6248551eb5d525010000006b483045022100df3b7945fdd0b00e2b723765491fd324f5a7429ea80e8425196870cdba89594902207c27419bb3806bf7a6815669c6cdedd33f23a9eee8924ddcb1a635454992055301210275caf1d1d29e1fa56145940db8c8c4986cf8081e7ff86832abb4adda92b0eed3feffffff02b07c36883c0000001976a914bfee7c9073129994ac4b88bcf9855d8be1b8911888ac00e40b54020000001976a914299480256432f2372df6d66e21ed48b097797c9a88aca4c24100',
      'index': 1,
      'inputs': [
        {
          'prevout': {
            'hash': '25d5b51e5548626c1194b3426867f648adfb5c9e79a42a00f970973d9dbe2f15',
            'index': 1,
          },
          'sequence': 4294967294,
          'script': '483045022100df3b7945fdd0b00e2b723765491fd324f5a7429ea80e8425196870cdba89594902207c27419bb3806bf7a6815669c6cdedd33f23a9eee8924ddcb1a635454992055301210275caf1d1d29e1fa56145940db8c8c4986cf8081e7ff86832abb4adda92b0eed3',
          'coin': {
            'version': 1,
            'height': 4309647,
            'value': '2699.83536',
            'script': '76a9148eb23647e81338b8121fac7aeb351cc1c0f6245f88ac',
            'address': 'nhCfhuB5dWMVC8AHD2L6Qvi17aCXszmH4t',
            'coinbase': false,
          },
        },
      ],
      'locktime': 4309668,
      'outputs': [
        {
          'value': '2599.8331',
          'script': '76a914bfee7c9073129994ac4b88bcf9855d8be1b8911888ac',
          'address': 'nmh12FPHeipHX6HfgpgPAeb1V1i54nR9Y3',
        },
        {
          'value': '100',
          'script': '76a914299480256432f2372df6d66e21ed48b097797c9a88ac',
          'address': 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        },
      ],
      'size': 226,
      'time': 1679152729,
      'version': 1,
      'vsize': 226,
      'witnessHash': '94c28ba7b8c1c0782635aa1334b527ff23701e2c345f797d44370b26024f5b76',
    }])

    const getUtxo = (hash: string, i: number): Promise<DogeUTXO> => Promise.resolve({
      'bestblock': '7709d7b0d7a59c3238b0d860d7aa5a086b4cf8b0d842937559853c45605f94c9',
      'confirmations': 0,
      'value': 100,
      'scriptPubKey': {
        'asm': 'OP_DUP OP_HASH160 299480256432f2372df6d66e21ed48b097797c9a OP_EQUALVERIFY OP_CHECKSIG',
        'hex': '76a914299480256432f2372df6d66e21ed48b097797c9a88ac',
        'reqSigs': 1,
        'type': 'pubkeyhash',
        'addresses': [
          'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        ],
      },
      'version': 1,
      'coinbase': false,
    })

    oldBtcBasedTxTestFactory.fromAddress({
      transactions: dogeTransactions({
        getTxByAddress: requestGetTxByAddress,
        getUtxo,
        dogeBroadcast: mockedApi.blockchain.doge.dogeBroadcast,
      } as any),
      data: {
        validAmount: VALID_ADDRESS_AMOUNT,
        validTxData: VALID_TX_ADDRESS_DATA,
      },
      mock: {
        requestGetUtxo: () => {
        },
        requestGetUtxoNotFound: () => {
        },
        requestGetTxByAddress,
        broadcast: mockedApi.blockchain.doge.dogeBroadcast,
      },
      getRequestBodyFromAddress,
    })
  })

  function getRequestBodyFromUTXO(amount: number): DogeTransactionUTXO {
    return {
      fromUTXO: [
        {
          privateKey: PRIVATE_KEY,
          txHash: TX_HASH,
          index: 1,
          value: UTXO_AMOUNT.toString(),
          address: ADDRESS,
        },
      ],
      to: [
        {
          address: TO_ADDRESS,
          value: amount,
        },
      ],
      changeAddress: ADDRESS,
      fee: '1',
    }
  }

  function getRequestBodyFromAddress(amount: number): DogeTransactionAddress {
    return {
      fromAddress: [
        {
          privateKey: PRIVATE_KEY,
          address: ADDRESS,
        },
      ],
      to: [
        {
          address: TO_ADDRESS,
          value: amount - 1,
        },
      ],
      changeAddress: ADDRESS,
      fee: '1',
    }
  }
})
