import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TatumTronSDK } from '../tron.sdk'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('TatumTronSDK - blockchain', () => {
  const sdk = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.tron
  const testData = TEST_DATA.TRON

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.tronBroadcast, { txData: 'hello' }],
    getBlock: [api.tronGetBlock, testData.BLOCK_HASH],
    getCurrentBlock: [api.tronGetCurrentBlock, undefined],
    getAccount: [api.tronGetAccount, testData.TESTNET.ADDRESS_0],
    getTrc10Detail: [api.tronTrc10Detail, 1000540],
    getTransaction: [api.tronGetTransaction, testData.TX_HASH],
    sendTransaction: [
      api.tronTransfer,
      { fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0, to: testData.TESTNET.ADDRESS_0, amount: 10 },
    ],
    generateAddress: [api.tronGenerateAddress, testData.TESTNET.XPUB, 0],
    getTransactions: [api.tronAccountTx, testData.TESTNET.ADDRESS_0],
    getTrc20Transactions: [api.tronAccountTx20, testData.TESTNET.ADDRESS_0],
    generateWallet: api.generateTronwallet,
    generatePrivateKey: [api.tronGenerateAddressPrivateKey, TEST_DATA.MNEMONIC, 0],
    createTrc10: [
      api.tronCreateTrc10,
      {
        fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0,
        recipient: testData.TESTNET.ADDRESS_0,
        name: 'Test',
        abbreviation: 'SYM',
        description: 'My short description',
        url: 'https://mytoken.com',
        totalSupply: 100000,
        decimals: 10,
      },
    ],
    createTrc20: [
      api.tronCreateTrc20,
      {
        symbol: 'TRC_SYMBOL',
        name: 'myTrc20',
        fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0,
        recipient: testData.TESTNET.ADDRESS_0,
        decimals: 10,
        totalSupply: 10000000,
      },
    ],
    transferTrc10: [
      api.tronTransferTrc10,
      {
        fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0,
        to: testData.TESTNET.ADDRESS_100,
        tokenId: '12345',
        amount: '1',
      },
    ],
    transferTrc20: [
      api.tronTransferTrc20,
      {
        fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0,
        to: testData.TESTNET.ADDRESS_100,
        tokenAddress: testData.TESTNET.ADDRESS_0,
        feeLimit: 0.01,
      },
    ],
    tronFreeze: [
      api.tronFreeze,
      {
        fromPrivateKey: testData.TESTNET.PRIVATE_KEY_0,
        receiver: testData.TESTNET.ADDRESS_0,
        duration: 3,
        resource: 'ENERGY',
        amount: '10000',
      },
    ],
    smartContractGetAddress: [blockchain.smartContractGetAddress, 'TRON', testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
