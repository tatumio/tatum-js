import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumBchSDK } from '../bch.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumBchSDK - blockchain', () => {
  const sdk = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.bcash
  const testData = TEST_DATA.BCH

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.bchBroadcast, { txData: 'hello' }],
    info: api.bchGetBlockChainInfo,
    getBlockHash: [api.bchGetBlockHash, testData.BLOCK_HEIGHT],
    getBlock: [api.bchGetBlock, testData.BLOCK_HASH],
    getTransaction: [api.bchGetRawTransaction, testData.TX_HASH],
    getTxForAccount: [api.bchGetTxByAddress, testData.TESTNET.ADDRESS_0],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
