import { dogeTransactions } from '../doge.sdk.tx'
import { mockHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { ChainEnum, DogeTransactionAddress, DogeTransactionUTXO } from '@tatumio/api-client'
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
    const requestGetUTXOsByAddress = (chain: ChainEnum, address: string, amount: number) => ([
      {
        'txHash': '94c28ba7b8c1c0782635aa1334b527ff23701e2c345f797d44370b26024f5b76',
        'index': 1,
        'value': 100,
        'address': 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        'chain': 'doge-testnet',
      },
    ])

    oldBtcBasedTxTestFactory.fromAddress({
      transactions: dogeTransactions({
        getUTXOsByAddress: requestGetUTXOsByAddress,
        getUtxo: mockedApi.blockchain.doge.dogeGetUtxo,
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
