import * as apiClient from '@tatumio/api-client'
import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '../egld.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('EgldSDK - blockchain', () => {
  const sdk = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.elgo
  const testData = TEST_DATA.EGLD

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.egldBroadcast, { txData: 'hello' }],
    getBlock: [api.egldGetBlock, testData.BLOCK_HASH],
    getCurrentBlock: api.eGldGetCurrentBlock,
    getBalance: [api.egldGetBalance, testData.ADDRESS_0],
    getTransaction: [api.egldGetTransaction, testData.TX_HASH],
    getTransactionsSentFromAddress: [api.egldGetTransactionAddress, testData.ADDRESS_0],
    getCountOfTransactionSentFromAddress: [api.egldGetTransactionCount, testData.ADDRESS_0],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
