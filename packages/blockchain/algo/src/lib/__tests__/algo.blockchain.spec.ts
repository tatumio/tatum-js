import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumAlgoSDK } from '../algo.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumAlgoSDK - blockchain', () => {
  const sdk = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.algo
  const testData = TEST_DATA.ALGO

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.algoandBroadcast, { txData: 'hello' }],
    getBlock: [api.algorandGetBlock, testData.BLOCK_HASH],
    getCurrentBlock: [api.algorandGetCurrentBlock, undefined],
    getBlockchainAccountBalance: [api.algorandGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.algorandGetTransaction, testData.TX_HASH],
    getPayTransactionByFromTo: [api.algorandGetPayTransactionsByFromTo, '1644830680', '1644830682'],
    receiveAsset: [
      api.algorandBlockchainReceiveAsset,
      testData.TESTNET.ADDRESS_0,
      testData.TESTNET.PRIVATE_KEY_0,
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
