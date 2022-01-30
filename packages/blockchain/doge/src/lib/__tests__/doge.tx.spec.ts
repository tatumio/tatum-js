import { dogeTransactions } from '../transaction/doge.tx'
import { btcBasedTxTestFactory, mockHelper } from '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { DogeTransactionUTXO } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('DOGE transactions', () => {
  const TX_HASH = 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5'
  const PRIVATE_KEY = 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1'
  const TO_ADDRESS = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
  const ADDRESS = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
  const UTXO_AMOUNT = 60.0819
  const VALID_AMOUNT = 58
  const VALID_TX_DATA =
    '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'

  const transactions = dogeTransactions()

  describe('From UTXO', () => {
    btcBasedTxTestFactory.fromUTXO({
      transactions,
      data: {
        validAmount: VALID_AMOUNT,
        utxoAmount: UTXO_AMOUNT,
        validTxData: VALID_TX_DATA,
      },
      mock: {
        requestGetRawTx: () => {},
        broadcast: mockedApi.blockchain.doge.dogeBroadcast,
      },
      getRequestBodyFromUTXO,
      skipTest: {
        noOutputs: true,
      },
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
})
