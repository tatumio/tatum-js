import { TatumBscSDK } from '@tatumio/bsc'
import { Currency } from '@tatumio/api-client'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscNftExample() {
  // Get NFT token metadata
  const { data } = await bscSDK.nft.getNFTMetadataURI(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )

  // Get NFT token provenance data, valid only for provenance contract.
  const provenanceData = await bscSDK.nft.getNFTProvenanceData(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )

  // Get NFT token royalty.
  const royalty = await bscSDK.nft.getNFTRoyalty(
    Currency.BSC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )

  // Get NFT transaction by transaction hash
  const transaction = await bscSDK.nft.getNFTTransaction(
    Currency.BSC,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await bscSDK.nft.getNFTAccountBalance(
    Currency.BSC,
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
  )

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  const deployHash = await bscSDK.nft.deployNFTSmartContract({
    chain: 'BSC',
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

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const transferHash = await bscSDK.nft.transferNFT({
    chain: 'BSC',
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

  // Create multiple NFT Tokens and transfer them to destination account. Create and transfer any NFT tokens from smart contract defined in contractAddress.
  const mintMultipleHash = await bscSDK.nft.mintMultipleNFTs({
    chain: 'BSC',
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

  // Mint NFTs on your own smart contract
  const minted = await bscSDK.nft.mintNFT({
    chain: 'BSC',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
  })

  // Mint NFTs on the pre-built smart contract provided by Tatum
  const mintedExpress = await bscSDK.nft.mintNFT({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
  })

  // Mint NFTs on your own smart contract with minter address
  const mintedWithMinter = await bscSDK.nft.mintNFT({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  })

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const burnHash = await bscSDK.nft.burnNFT({
    chain: 'BSC',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  // Add new minter of NFT Tokens. This method adds minter permission to new minter address.
  const addMinterHash = await bscSDK.nft.addNFTMinter({
    chain: 'BSC',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  // Update royalty cashback value for one NFT Token. This method updates the first royalty value of specific author for 1 token
  const updateRoyaltyHash = await bscSDK.nft.updateNFTRoyalty({
    chain: 'BSC',
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
