import * as apiClient from '@tatumio/api-client'
import { commonTestFactory, TestCasesApiCallMapping, testHelper } from '@tatumio/shared-testing-common'
import axios from 'axios'
import { abstractSdkNftService } from '../services/nft.abstract'

jest.mock('@tatumio/api-client')
jest.mock('axios')

const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('SDK - nft', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const nft = abstractSdkNftService()
  const api = mockedApi.nft

  const contractAddress = 'some-contract-address'
  const address = 'some-address'
  const privateKey = 'some-private-key'
  const nonce = '12345678'
  const chain = 'ETH'
  const name = 'some-name'
  const symbol = 'some-symbol'
  const tokenId = 'some-token-id'
  const url = 'some-url'
  const hash = 'some-hash'

  const nftAddressFunctionsMapping: Omit<
    TestCasesApiCallMapping<typeof nft>,
    'getNFTImage' | 'prepareAddNftMinterAbstraction' | 'getNFTContractAddress'
  > = {
    addNFTMinter: [
      api.nftAddMinter,
      { chain, contractAddress, minter: address, fromPrivateKey: privateKey, nonce },
    ],
    deployNFTSmartContract: [api.nftDeployErc721, { chain, name, symbol, fromPrivateKey: privateKey, nonce }],
    mintNFT: [
      api.nftMintErc721,
      { chain, tokenId, to: address, contractAddress, url, fromPrivateKey: privateKey },
    ],
    mintMultipleNFTs: [
      api.nftMintMultipleErc721,
      { chain, to: [address], tokenId, url: [url], contractAddress, fromPrivateKey: privateKey, nonce },
    ],
    burnNFT: [api.nftBurnErc721, { chain, tokenId, contractAddress, url, fromPrivateKey: privateKey }],
    transferNFT: [
      api.nftTransferErc721,
      { chain, tokenId, to: address, contractAddress, url, fromPrivateKey: privateKey, value: 'some-value' },
    ],
    getNFTTransaction: [api.nftGetTransactErc721, chain, hash],
    getNFTTransactionsByToken: [api.nftGetTransactionByToken, chain, tokenId, address, 10],
    getNFTTransactionsByAddress: [api.nftGetTransactionByAddress, chain, 'token-address', address, 10],
    getNFTsByAddress: [api.nftGetTokensByAddressErc721, chain, address],
    getNFTMetadataURI: [api.nftGetMetadataErc721, chain, contractAddress, tokenId, 'account-id'],
    getNFTAccountBalance: [api.nftGetBalanceErc721, chain, address, contractAddress],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods<
      Omit<typeof nft, 'getNFTImage' | 'prepareAddNftMinterAbstraction' | 'getNFTContractAddress'>
    >(nft, nftAddressFunctionsMapping)
  })

  it('prepareAddNftMinterAbstraction', () => {
    const result = nft.prepareAddNftMinterAbstraction({
      chain,
      contractAddress,
      fromPrivateKey: privateKey,
      minter: address,
    })

    expect(result).toHaveLength(2)
    expect(result[0]).toBe('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6')
    expect(result[1]).toBe(address)
  })

  it('getNFTImage', async () => {
    const metadata = 'https://my_token_data.com/'
    const accountId = 'account-id'

    const mockedNftGetMetadataErc721 = jest.fn().mockReturnValue({
      data: metadata,
    })
    mockedApi.nft.nftGetMetadataErc721 = mockedNftGetMetadataErc721

    const imageUrl = 'some-image-url'

    ;(axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          image: imageUrl,
        },
      }),
    )

    const result = await nft.getNFTImage(chain, contractAddress, tokenId, accountId)

    testHelper.expectMockCalled(api.nftGetMetadataErc721, [chain, contractAddress, tokenId, accountId])

    expect(result?.originalUrl).toBe(imageUrl)
    expect(result?.publicUrl).toBe(`https://gateway.pinata.cloud/ipfs/${imageUrl}`)
  })
})
