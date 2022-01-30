import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
  testHelper,
} from '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { BchTransaction } from '@tatumio/api-client'
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
    send: [
      api.bchTransferBlockchain,
      {
        fromUTXO: [{ txHash: testData.TX_HASH, index: 0, privateKey: testData.TESTNET.PRIVATE_KEY_0 }],
        to: [{ address: testData.TESTNET.ADDRESS_100, value: 1 }],
      } as BchTransaction,
    ],
  }

  it.each(testHelper.testCasesFromMapping(blockchainFunctionsMapping))(
    '%p',
    async (sdkMethod: any, apiMethod: any, args: unknown[] = []) => {
      await testHelper.callFnWithArgs(blockchain[sdkMethod], args)
      testHelper.expectMockCalled(apiMethod, args)
    },
  )
})
