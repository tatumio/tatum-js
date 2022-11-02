import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
  testHelper,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumDogeSDK } from '../doge.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('DOGE - blockchain', () => {
  const sdk = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.doge
  const testData = TEST_DATA.DOGE

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    mempool: api.dogeGetMempool,
    broadcast: [api.dogeBroadcast, { txData: 'hello' }],
    info: api.dogeGetBlockChainInfo,
    getBlockHash: [api.dogeGetBlockHash, testData.BLOCK_HEIGHT],
    getBlock: [api.dogeGetBlock, testData.BLOCK_HASH],
    getUTXO: [api.dogeGetUtxo, testData.TX_HASH, 0],
    getTransaction: [api.dogeGetRawTransaction, testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
