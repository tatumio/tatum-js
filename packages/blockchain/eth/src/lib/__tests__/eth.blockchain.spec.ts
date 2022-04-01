import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '../eth.sdk'
import * as apiClient from '@tatumio/api-client'
import {
  CallSmartContractMethod,
  EthEstimateGas,
  PrivKeyRequest,
  TransferEthBlockchain,
} from '@tatumio/api-client'
import { Web3Request } from '@tatumio/shared-core'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('EthSDK - blockchain', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.eth
  const testData = TEST_DATA.ETH

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.ethBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.ethGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.ethGetCurrentBlock, {}],
    getBlock: [api.ethGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.ethGetBalance, testData.TESTNET.ADDRESS_0],
    get: [api.ethGetTransaction, testData.TX_HASH],
    getAccountTransactions: [api.ethGetTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    getInternalTransaction: [api.ethGetInternalTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    estimateGas: [
      api.ethEstimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as EthEstimateGas,
    ],
    estimateGasBatch: [
      api.ethEstimateGasBatch,
      {
        estimations: [
          {
            from: testData.TESTNET.ADDRESS_0,
            to: testData.TESTNET.ADDRESS_100,
            contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
            amount: '10',
          } as EthEstimateGas,
        ],
      },
    ],
    smartContractInvocation: [
      api.ethBlockchainSmartContractInvocation,
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
    blockchainTransfer: [
      api.ethBlockchainTransfer,
      {
        data: 'My note to recipient.',
        nonce: 0,
        to: testData.TESTNET.ADDRESS_100,
        currency: 'ETH',
        fee: { gasLimit: '40000', gasPrice: '20' },
        amount: '100000',
        fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
      } as TransferEthBlockchain,
    ],
    generateAddress: [api.ethGenerateAddress, testData.TESTNET.XPUB, 1],
    generateAddressPrivateKey: [
      api.ethGenerateAddressPrivateKey,
      {
        index: 0,
        mnemonic: TEST_DATA.MNEMONIC,
      } as PrivKeyRequest,
    ],
    generateWallet: [api.ethGenerateWallet, TEST_DATA.MNEMONIC],
    web3Driver: [
      api.ethWeb3Driver,
      REPLACE_ME_WITH_TATUM_API_KEY,
      {
        jsonrpc: '2.0',
        method: 'web3_clientVersion',
        params: [],
        id: 2,
      } as Web3Request,
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
