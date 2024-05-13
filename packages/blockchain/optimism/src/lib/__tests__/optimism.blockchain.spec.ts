import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumOptimismSDK } from '../optimism.sdk'
import * as apiClient from '@tatumio/api-client'
import { BlockchainUtilsService, CallSmartContractMethod, OptimismEstimateGas } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('OptimismSDK - blockchain', () => {
  const sdk = TatumOptimismSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.optimism
  const testData = TEST_DATA.OPTIMISM

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.optimismBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.optimismGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.optimismGetCurrentBlock, {}],
    getBlock: [api.optimismGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.optimismGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.optimismGetTransaction, testData.TX_HASH],
    smartContractGetAddress: [BlockchainUtilsService.scGetContractAddress, 'OPTIMISM', testData.TX_HASH],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as OptimismEstimateGas,
    ],
    smartContractInvocation: [
      api.optimismBlockchainSmartContractInvocation,
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
