import {
  AddNftMinter,
  BurnNft,
  DeployNft,
  MintMultipleNft,
  MintNft,
  TransferNft,
  UpdateCashbackValueForAuthorNft,
} from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethNftExample() {
  const metadataURI = await ethSDK.nft.getNFTMetadataURI(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await ethSDK.nft.getNFTProvenanceData(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await ethSDK.nft.getNFTRoyalty(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await ethSDK.nft.getNFTTransaction(
    Currency.ETH,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionByAddress = await ethSDK.nft.getNFTTransactionsByAddress(
    Currency.ETH,
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transactionByToken = await ethSDK.nft.getNFTTransactionsByToken(
    Currency.ETH,
    1,
    '0x1ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const nftByAddress = await ethSDK.nft.getNFTsByAddress(
    Currency.ETH,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  // TODO bug in openapi - chain and feeCurrency
  const mintedHash = await ethSDK.nft.mintNFT({
    chain: MintNft.chain.ETH,
    tokenId: '100000',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    authorAddresses: ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    provenance: true,
    cashbackValues: ['0.5'],
    fixedValues: ['0.5'],
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
  })

  const nftAccountBalance = await ethSDK.nft.getNFTAccountBalance(
    Currency.ETH,
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
  )

  const deployHash = await ethSDK.nft.deployNFTSmartContract({
    // TODO openapi bug
    chain: DeployNft.chain.ETH,
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    provenance: true,
    publicMint: true,
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const transferHash = await ethSDK.nft.transferNFT({
    // TODO openapi bug
    chain: TransferNft.chain.ETH,
    value: '1',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '1000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    provenance: true,
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const mintMultipleHash = await ethSDK.nft.mintMultipleNFTs({
    // TODO openapi bug
    chain: MintMultipleNft.chain.ETH,
    to: ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    tokenId: ['100000'],
    url: ['https://my_token_data.com'],
    authorAddresses: [['0x687422eEA2cB73B5d3e242bA5456b782919AFc85']],
    cashbackValues: [['0.5']],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const burnHash = await ethSDK.nft.burnNFT({
    // TODO openapi bug
    chain: BurnNft.chain.ETH,
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const addMinterHash = await ethSDK.nft.addNFTMinter({
    // TODO openapi bug
    chain: AddNftMinter.chain.ETH,
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const updateRoyaltyHash = await ethSDK.nft.updateNFTRoyalty({
    // TODO openapi bug
    chain: UpdateCashbackValueForAuthorNft.chain.ETH,
    tokenId: '100000',
    cashbackValue: '0.1',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })
}
