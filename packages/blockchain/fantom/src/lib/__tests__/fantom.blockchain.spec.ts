import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumFantomSDK } from '../fantom.sdk'
import * as apiClient from '@tatumio/api-client'
import { BlockchainUtilsService, CallSmartContractMethod, FantomEstimateGas } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('FantomSDK - blockchain', () => {
  const sdk = TatumFantomSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.fantom
  const testData = TEST_DATA.FTM

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.fantomBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.fantomGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.fantomGetCurrentBlock, {}],
    getBlock: [api.fantomGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.fantomGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.fantomGetTransaction, testData.TX_HASH],
    smartContractGetAddress: [BlockchainUtilsService.scGetContractAddress, 'FTM', testData.TX_HASH],
    getAccountTransactions: [api.fantomGetTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    getInternalTransaction: [api.fantomGetInternalTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as FantomEstimateGas,
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
          } as FantomEstimateGas,
        ],
      },
    ],
    smartContractInvocation: [
      api.fantomBlockchainSmartContractInvocation,
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
