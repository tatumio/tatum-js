import {
  blockchainTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumAdaSDK } from '../ada.sdk'
import * as apiClient from '@tatumio/api-client'
import { AdaTransactionFromAddress, PrivKeyRequest } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('AdaSDK - blockchain', () => {
  const sdk = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.ada
  const testData = TEST_DATA.ADA

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.adaBroadcast, { txData: 'hello' }],
    getBlock: [api.adaGetBlock, testData.BLOCK_HASH],
    getBlockChainInfo: api.adaGetBlockChainInfo,
    getTransaction: [api.adaGetRawTransaction, testData.TX_HASH],
    getTransactionByAddress: [api.adaGetTxByAddress, testData.TX_HASH, 10],
    blockchainTransfer: [
      api.adaTransferBlockchain,
      {
        changeAddress: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        fee: '0.5',
        fromAddress: [
          {
            address: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
          },
        ],
        to: [{ address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7', value: 0.02969944 }],
      } as AdaTransactionFromAddress,
    ],
    generateAddress: [api.adaGenerateAddress, testData.TESTNET.XPUB, 1],
    generateAddressPrivateKey: [
      api.adaGenerateAddressPrivateKey,
      {
        index: 0,
        mnemonic: TEST_DATA.MNEMONIC,
      } as PrivKeyRequest,
    ],
    generateWallet: [api.adaGenerateWallet, TEST_DATA.MNEMONIC],
    getAccount: [api.adaGetAccount, testData.TESTNET.ADDRESS],
    getUTXOs: [api.adaGetUtxoByAddress, testData.TESTNET.ADDRESS],
    graphQL: [
      api.adaGraphQl,
      {
        query: '{ cardano { tip { number slotNo epoch { number } }} }',
      },
    ],
  }

  describe('API methods mapping', () => {
    blockchainTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
