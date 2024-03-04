import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumCronosSDK } from '../cronos.sdk'
import * as apiClient from '@tatumio/api-client'
import { BlockchainUtilsService, CallSmartContractMethod } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('CronosSDK - blockchain', () => {
  const sdk = TatumCronosSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.cronos
  const testData = TEST_DATA.CRO

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.cronosBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.cronosGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.cronosGetCurrentBlock, {}],
    getBlock: [api.cronosGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.cronosGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.cronosGetTransaction, testData.TX_HASH],
    smartContractGetAddress: [BlockchainUtilsService.scGetContractAddress, 'CRO', testData.TX_HASH],
    smartContractInvocation: [
      api.cronosBlockchainSmartContractInvocation,
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
