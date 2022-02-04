import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
  testHelper,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumLtcSDK } from '../ltc.sdk'
import { LtcTransactionAddress } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumLtcSDK - blockchain', () => {
  const sdk = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.ltc
  const testData = TEST_DATA.LTC

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    mempool: api.ltcGetMempool,
    broadcast: [api.ltcBroadcast, { txData: 'hello' }],
    info: api.ltcGetBlockChainInfo,
    getBlockHash: [api.ltcGetBlockHash, testData.BLOCK_HEIGHT],
    getBlock: [api.ltcGetBlock, testData.BLOCK_HASH],
    getUTXO: [api.ltcGetUtxo, testData.TX_HASH, 0],
    getBlockchainAccountBalance: [api.ltcGetBalanceOfAddress, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.ltcGetRawTransaction, testData.TX_HASH],
    getTxForAccount: [api.ltcGetTxByAddress, testData.TESTNET.ADDRESS_0, 50],
    send: [
      api.ltcTransferBlockchain,
      {
        fromAddress: [{ address: testData.TESTNET.ADDRESS_0, privateKey: testData.TESTNET.PRIVATE_KEY_0 }],
        to: [{ address: testData.TESTNET.ADDRESS_100, value: 1 }],
      } as LtcTransactionAddress,
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
