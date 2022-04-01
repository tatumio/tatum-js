import * as apiClient from '@tatumio/api-client'
import { TransferXrpBlockchain } from '@tatumio/api-client'
import { TatumXrpSDK } from '../xrp.sdk'
import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('XrpSDK - blockchain', () => {
  const sdk = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.xrp
  const testData = TEST_DATA.XRP

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    info: api.xrpGetLastClosedLedger,
    broadcast: [api.xrpBroadcast, { txData: 'hello' }],
    getAccountBalance: [api.xrpGetAccountBalance, testData.ADDRESS],
    getAccountInfo: [api.xrpGetAccountInfo, testData.ADDRESS],
    getTx: [api.xrpGetTransaction, testData.TX_HASH],
    getFee: api.xrpGetFee,
    getLedger: [api.xrpGetLedger, testData.BLOCK_NUMBER],
    getAccountTx: [api.xrpGetAccountTx, testData.ADDRESS],
    sendTransaction: [
      api.xrpTransferBlockchain,
      {
        fromAccount: testData.ADDRESS,
        amount: '1',
        fee: '0.00001',
        fromSecret: testData.SECRET,
      } as TransferXrpBlockchain,
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
