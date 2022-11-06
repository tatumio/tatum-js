import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumBtcSDK } from '../btc.sdk'
import * as apiClient from '@tatumio/api-client'
import { BtcTransactionFromAddress } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BtcSDK - blockchain', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.bitcoin
  const testData = TEST_DATA.BTC

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    mempool: api.btcGetMempool,
    broadcast: [api.btcBroadcast, { txData: 'hello' }],
    info: api.btcGetBlockChainInfo,
    getBlockHash: [api.btcGetBlockHash, testData.BLOCK_HEIGHT],
    getBlock: [api.btcGetBlock, testData.BLOCK_HASH],
    getUTXO: [api.btcGetUtxo, testData.TX_HASH, 0],
    getBlockchainAccountBalance: [api.btcGetBalanceOfAddress, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.btcGetRawTransaction, testData.TX_HASH],
    getTransactionsByAddress: [api.btcGetTxByAddress, testData.TESTNET.ADDRESS_0, 50],
    estimateFee: [sdk.blockchain.estimateFee, {}],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
