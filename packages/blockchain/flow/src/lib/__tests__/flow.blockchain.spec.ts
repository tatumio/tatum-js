import * as apiClient from '@tatumio/api-client'
import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumFlowSDK } from '../flow.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

// TODO - fix
describe.skip('FlowSdk - blockchain', () => {
  const sdk = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY, testnet: true })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.flow
  const testData = TEST_DATA.FLOW

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: undefined,
    generateAddress: [api.flowGenerateAddress, testData.TESTNET.XPUB, 0],
    smartContractGetAddress: [mockedApi.blockchain.util.scGetContractAddress, 'FLOW', testData.TX_HASH],
    getAccount: [api.flowGetAccount, testData.ACCOUNT],
    getBlock: [api.flowGetBlock, testData.BLOCK_HASH],
    getCurrentBlock: api.flowGetBlockChainInfo,
    getTransaction: [api.flowGetRawTransaction, testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
