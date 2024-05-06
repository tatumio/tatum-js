import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumAvalancheSDK } from '../avalanche.sdk'
import * as apiClient from '@tatumio/api-client'
import { Currency } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe.skip('AvalancheSDK - nft', () => {
  const sdk = TatumAvalancheSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const nft = sdk.nft
  const api = mockedApi.nft
  const testData = TEST_DATA.AVAX

  const nftFunctionsMapping: Omit<
    TestCasesApiCallMapping<typeof nft>,
    'prepare' | 'send' | 'getNFTImage' | 'prepareAddNftMinterAbstraction' | 'getNFTContractAddress'
  > = {
    deployNFTSmartContract: [
      api.nftDeployErc721,
      {
        chain: Currency.AVAX,
        name: 'erc721-token',
        symbol: 'erc721-token',
        fromPrivateKey: testData.TESTNET.ERC_721.PRIVATE_KEY,
      },
    ],
    mintNFT: [
      api.nftMintErc721,
      {
        chain: Currency.AVAX,
        to: testData.TESTNET.ERC_721?.ADDRESS,
        url: 'https://google.com/',
      },
    ],
    transferNFT: [
      api.nftTransferErc721,
      {
        chain: Currency.AVAX,
        to: testData.TESTNET.ERC_721?.ADDRESS,
        contractAddress: testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
        tokenId: 'erc721-token',
        fromPrivateKey: testData.TESTNET.ERC_721?.PRIVATE_KEY,
      },
    ],
    mintMultipleNFTs: [
      api.nftMintMultipleErc721,
      {
        chain: Currency.AVAX,
        to: testData.TESTNET.ERC_721?.ADDRESS,
        tokenId: 'erc721-token',
        minter: testData.TESTNET.ERC_721?.ADDRESS,
        url: 'https://google.com',
        contractAddress: testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
      },
    ],
    burnNFT: [
      api.nftBurnErc721,
      {
        chain: Currency.AVAX,
        tokenId: 'erc721-token',
        contractAddress: testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
        fromPrivateKey: testData.TESTNET.ERC_721?.PRIVATE_KEY,
      },
    ],
    addNFTMinter: [
      api.nftAddMinter,
      {
        chain: Currency.AVAX,
        contractAddress: testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
        minter: testData.TESTNET.ERC_721?.ADDRESS,
        fromPrivateKey: testData.TESTNET.ERC_721?.PRIVATE_KEY,
      },
    ],
    getNFTTransaction: [
      api.nftGetTransactErc721,
      Currency.AVAX,
      '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
    ],
    getNFTTransactionsByToken: [
      api.nftGetTransactionByToken,
      Currency.AVAX,
      'erc721-token',
      testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
      20,
    ],
    getNFTTransactionsByAddress: [
      api.nftGetTransactionByAddress,
      Currency.AVAX,
      testData.TESTNET.ERC_721?.ADDRESS,
      testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
      20,
    ],
    getNFTsByAddress: [
      api.nftGetTokensByAddressErc721,
      Currency.AVAX,
      testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
    ],
    getNFTAccountBalance: [
      api.nftGetBalanceErc721,
      Currency.AVAX,
      testData.TESTNET.ERC_721?.ADDRESS,
      testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
    ],
    getNFTMetadataURI: [
      api.nftGetMetadataErc721,
      Currency.AVAX,
      testData.TESTNET.ERC_721?.CONTRACT_ADDRESS,
      'erc721-token',
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods<
      Omit<
        typeof nft,
        'prepare' | 'send' | 'getNFTImage' | 'prepareAddNftMinterAbstraction' | 'getNFTContractAddress'
      >
    >(nft, nftFunctionsMapping)
  })
})
