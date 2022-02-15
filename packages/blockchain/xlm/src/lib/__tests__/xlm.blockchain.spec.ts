import * as apiClient from '@tatumio/api-client'
import { TransferXlmBlockchain, TrustLineXlmBlockchain } from '@tatumio/api-client'
import {
  blockchainTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumXlmSDK } from '../xlm.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('XlmSDK - blockchain', () => {
  const sdk = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.xlm
  const testData = TEST_DATA.XLM

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    info: api.xlmGetLastClosedLedger,
    broadcast: [api.xlmBroadcast, { txData: 'hello' }],
    getAccountInfo: [api.xlmGetAccountInfo, testData.ADDRESS],
    getTransaction: [api.xlmGetTransaction, testData.TX_HASH],
    getFee: api.xlmGetFee,
    getLedger: [api.xlmGetLedger, testData.SEQUENCE],
    getLedgerTx: [api.xlmGetLedgerTx, testData.SEQUENCE],
    getAccountTransactions: [api.xlmGetAccountTx, testData.ADDRESS],
    sendTransaction: [
      api.xlmTransferBlockchain,
      {
        amount: '1',
        fromSecret: testData.SECRET,
        to: testData.ADDRESS,
      } as TransferXlmBlockchain,
    ],
    trustLine: [
      api.xlmTrustLineBlockchain,
      {
        fromAccount: testData.ADDRESS,
        fromSecret: testData.SECRET,
        issuerAccount: testData.ADDRESS,
        token: 'XLM',
      } as TrustLineXlmBlockchain,
    ],
  }

  describe('API methods mapping', () => {
    blockchainTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
