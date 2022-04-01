import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumTronSDK } from '../tron.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumTronSDK - blockchain', () => {
  const sdk = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.tron
  const testData = TEST_DATA.TRON

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.tronBroadcast, { txData: 'hello' }],
    getBlock: [api.tronGetBlock, testData.BLOCK_HASH],
    getCurrentBlock: [api.tronGetCurrentBlock, undefined],
    getAccount: [api.tronGetAccount, testData.TESTNET.ADDRESS_0],
    getTrc10Detail: [api.tronTrc10Detail, 1000540],
    getTransaction: [api.tronGetTransaction, testData.TX_HASH],
    sendTransaction: [
      api.tronTransfer,
      { fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0, to: testData.TESTNET.ADDRESS_0, amount: 10 },
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
