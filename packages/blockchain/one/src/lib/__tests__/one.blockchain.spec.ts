import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '../one.sdk'
import * as apiClient from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('OneSDK - blockchain', () => {
  const sdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.one
  const testData = TEST_DATA.ONE

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.oneBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.oneGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: api.oneGetCurrentBlock,
    getBlock: [api.oneGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.oneGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.oneGetTransaction, testData.TX_HASH],
    smartContractInvocation: [
      api.oneBlockchainSmartContractInvocation,
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
      },
    ],
    smartContractGetAddress: [blockchain.smartContractGetAddress, 'ONE', testData.TX_HASH],
    formatAddress: [api.oneFormatAddress, 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
