import { TatumCeloSDK } from '@tatumio/celo'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoNftExample() {
  const metadataURI = await celoSDK.nft.getNFTMetadataURI(
    Currency.CELO,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await celoSDK.nft.getNFTProvenanceData(
    Currency.CELO,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await celoSDK.nft.getNFTRoyalty(
    Currency.CELO,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await celoSDK.nft.getNFTTransaction(
    Currency.CELO,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionByAddress = await celoSDK.nft.getNFTTransactionsByAddress(
    Currency.CELO,
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transactionByToken = await celoSDK.nft.getNFTTransactionsByToken(
    Currency.CELO,
    1,
    '0x1ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const nftByAddress = await celoSDK.nft.getNFTsByAddress(
    Currency.CELO,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
  )

  const nftAccountBalance = await celoSDK.nft.getNFTAccountBalance(
    Currency.CELO,
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
  )

  const mintedHash = await celoSDK.nft.mintNFT({
    chain: 'CELO',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    feeCurrency: 'CELO',
  })

  const mintedWithMinterHash = await celoSDK.nft.mintNFT({
    chain: 'CELO',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    tokenId: '100000',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    feeCurrency: 'CELO'
  })

  const deployHash = await celoSDK.nft.deployNFTSmartContract({
    chain: 'CELO',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    provenance: true,
    publicMint: true,
    nonce: 0,
    feeCurrency: 'CUSD',
  })

  const transferHash = await celoSDK.nft.transferNFT({
    chain: 'CELO',
    value: '1',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '1000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    provenance: true,
    nonce: 1,
    tokenPrice: '1',
    feeCurrency: 'CELO',
  })

  const mintMultipleHash = await celoSDK.nft.mintMultipleNFTs({
    chain: 'CELO',
    to: ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    tokenId: ['100000'],
    url: ['https://my_token_data.com'],
    authorAddresses: [['0x687422eEA2cB73B5d3e242bA5456b782919AFc85']],
    cashbackValues: [['0.5']],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    feeCurrency: 'CELO',
  })

  const burnHash = await celoSDK.nft.burnNFT({
    chain: 'CELO',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    feeCurrency: 'CUSD',
  })

  const addMinterHash = await celoSDK.nft.addNFTMinter({
    chain: 'CELO',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    feeCurrency: 'CELO',
  })

  const updateRoyaltyHash = await celoSDK.nft.updateNFTRoyalty({
    chain: 'CELO',
    tokenId: '100000',
    cashbackValue: '0.1',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    feeCurrency: 'CUSD',
  })
}
