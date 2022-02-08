import {
  AddNftMinter,
  BurnNft,
  DeployNft,
  MintMultipleNft,
  MintNft,
  UpdateCashbackValueForAuthorNft,
} from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscNftExample() {
  const metadataURI = await bscSDK.nft.getNFTMetadataURI(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await bscSDK.nft.getNFTProvenanceData(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await bscSDK.nft.getNFTRoyalty(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await bscSDK.nft.getNFTTransaction(
    Currency.BSC,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const nftByAddress = await bscSDK.nft.getNFTsByAddress(
    Currency.BSC,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  const nftAccountBalance = await bscSDK.nft.getNFTAccountBalance(
    Currency.BSC,
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
  )

  const deployHash = await bscSDK.nft.deployNFTSmartContract({
    // TODO openapi bug
    chain: DeployNft.chain.BSC,
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

  const transferHash = await bscSDK.nft.transferNFT({
    // TODO openapi bug
    chain: DeployNft.chain.BSC,
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

  const mintMultipleHash = await bscSDK.nft.mintMultipleNFTs({
    // TODO openapi bug
    chain: MintMultipleNft.chain.BSC,
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

  const minted = await bscSDK.nft.mintNFT({
    // TODO openapi bug
    chain: MintNft.chain.BSC,
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

  const burnHash = await bscSDK.nft.burnNFT({
    // TODO openapi bug
    chain: BurnNft.chain.BSC,
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const addMinterHash = await bscSDK.nft.addNFTMinter({
    // TODO openapi bug
    chain: AddNftMinter.chain.BSC,
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const updateRoyaltyHash = await bscSDK.nft.updateNFTRoyalty({
    // TODO openapi bug
    chain: UpdateCashbackValueForAuthorNft.chain.BSC,
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
