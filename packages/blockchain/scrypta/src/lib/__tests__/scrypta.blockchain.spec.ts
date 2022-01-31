import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
  testHelper,
} from '@tatumio/shared-testing'
import * as apiClient from '@tatumio/api-client'
import { ScryptaTransaction } from '@tatumio/api-client'
import { TatumScryptaSDK } from '../scrypta.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumScryptaSDK - blockchain', () => {
  const sdk = TatumScryptaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.scrypta
  const testData = TEST_DATA.SCRYPTA

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.broadcastsignedScryptatransaction, { txData: 'hello' }],
    info: api.getScryptaBlockchainInformation,
    getBlockHash: [api.getScryptaBlockhash, testData.BLOCK_HEIGHT],
    getBlock: [api.getScryptaBlockbyhashorheight, testData.BLOCK_HASH],
    getUTXO: [api.getScryptaUtxOofTransaction, testData.TX_HASH, 0],
    getUTXOForAccount: [api.getScryptaspendableUtxo, 50, 0, testData.TESTNET.ADDRESS_0], // @TODO Openapi bug
    getTransaction: [api.getScryptaTransactionbyhash, testData.TX_HASH],
    getTransactionsByAddress: [api.getScryptaTransactionsbyaddress, 50, 0, testData.TESTNET.ADDRESS_0], // @TODO Openapi bug
    sendTransaction: [
      api.sendLyrAtoblockchainaddresses,
      {
        fromAddress: [{ address: testData.TESTNET.ADDRESS_0, privateKey: testData.TESTNET.PRIVATE_KEY_0 }],
        to: [{ address: testData.TESTNET.ADDRESS_100, value: 1 }],
      } as ScryptaTransaction,
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
