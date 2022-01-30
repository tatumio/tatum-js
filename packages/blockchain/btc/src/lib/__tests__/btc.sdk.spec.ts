import { REPLACE_ME_WITH_TATUM_API_KEY, testHelper } from '@tatumio/shared-testing'
import { TatumBtcSDK } from '../btc.sdk'
import * as apiClient from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumBtcSDK', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Blockchain', () => {
    const blockchain = sdk.blockchain
    const api = mockedApi.blockchain.bitcoin

    it.each([
      [blockchain.broadcast, api.btcBroadcast, [{ txData: 'hello' }]],
      [blockchain.getCurrentBlock, api.btcGetBlockChainInfo],
      [blockchain.getBlockHash, api.btcGetBlockHash, [123456789]],
      [
        blockchain.getBlock,
        api.btcGetBlock,
        ['0000000017cb15f6f5afd3d1f3ac72209edc502442879c59bf79abdc39e3a3ff'],
      ],
      [
        blockchain.getUTXO,
        api.btcGetUtxo,
        ['5a3a323f55d79cbd643160b237a6f69b3d0268617a84e8acc30812df87498361', 0],
      ],
      [
        blockchain.getBlockchainAccountBalance,
        api.btcGetBalanceOfAddress,
        ['tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr'],
      ],
      [
        blockchain.get,
        api.btcGetRawTransaction,
        ['fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7'],
      ],
      [
        blockchain.getAccountTransactions,
        api.btcGetTxByAddress,
        ['fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7'],
      ],
    ])('%p', async (sdkMethod: any, apiMethod: any, args: unknown[] = []) => {
      await testHelper.callFnWithArgs(sdkMethod, args)
      testHelper.expectMockCalled(apiMethod, args)
    })
  })
})
