import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumBaseSDK } from '../base.sdk'
import * as apiClient from '@tatumio/api-client'
import { BlockchainUtilsService, CallSmartContractMethod, BaseEstimateGas } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BaseSDK - blockchain', () => {
  const sdk = TatumBaseSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.base
  const testData = TEST_DATA.BASE

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.baseBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.baseGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.baseGetCurrentBlock, {}],
    getBlock: [api.baseGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.baseGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.baseGetTransaction, testData.TX_HASH],
    smartContractGetAddress: [BlockchainUtilsService.scGetContractAddress, 'BASE', testData.TX_HASH],
    getAccountTransactions: [api.baseGetTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    getInternalTransaction: [api.baseGetInternalTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as BaseEstimateGas,
    ],
    estimateGasBatch: [
      blockchain.estimateGasBatch,
      {
        estimations: [
          {
            from: testData.TESTNET.ADDRESS_0,
            to: testData.TESTNET.ADDRESS_100,
            contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
            amount: '10',
          } as BaseEstimateGas,
        ],
      },
    ],
    smartContractInvocation: [
      api.baseBlockchainSmartContractInvocation,
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
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
