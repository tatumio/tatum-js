import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
  testHelper,
} from '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { DogeTransactionUTXO } from '@tatumio/api-client'
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
    sendTransaction: [
      api.dogeTransferBlockchain,
      {
        fee: '1',
        changeAddress: testData.TESTNET.ADDRESS_0,
        fromUTXO: [
          {
            txHash: testData.TX_HASH,
            value: '10',
            index: 0,
            address: testData.TESTNET.ADDRESS_0,
            privateKey: testData.TESTNET.PRIVATE_KEY_0,
          },
        ],
        to: [{ address: testData.TESTNET.ADDRESS_100, value: 1 }],
      } as DogeTransactionUTXO,
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
