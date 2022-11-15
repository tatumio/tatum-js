import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumPolygonSDK } from '../polygon.sdk'
import * as apiClient from '@tatumio/api-client'
import { CallSmartContractMethod, PolygonEstimateGas } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('PolygonSDK - blockchain', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.polygon
  const testData = TEST_DATA.POLYGON

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.polygonBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.polygonGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: api.polygonGetCurrentBlock,
    getBlock: [api.polygonGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.polygonGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.polygonGetTransaction, testData.TX_HASH],
    getAccountTransactions: [api.polygonGetTransactionByAddress, testData.TESTNET.ADDRESS_0, 10],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as PolygonEstimateGas,
    ],
    smartContractInvocation: [
      api.polygonBlockchainSmartContractInvocation,
      {
        contractAddress: testData.TESTNET.ERC_20.CONTRACT_ADDRESS,
        methodName: 'transfer',
        methodABI: {
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'stake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        params: ['0x632'],
        amount: '100000',
        fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
        nonce: 0,
        fee: { gasLimit: '40000', gasPrice: '20' },
      } as CallSmartContractMethod,
    ],
    smartContractGetAddress: [blockchain.smartContractGetAddress, 'MATIC', testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
