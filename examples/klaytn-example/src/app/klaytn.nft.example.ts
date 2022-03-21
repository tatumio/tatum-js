import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnNftExample() {
  const metadataURI = await klaytnSDK.nft.getNFTMetadataURI(
    Currency.KLAY,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await klaytnSDK.nft.getNFTProvenanceData(
    Currency.KLAY,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await klaytnSDK.nft.getNFTRoyalty(
    Currency.KLAY,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await klaytnSDK.nft.getNFTTransaction(
    Currency.KLAY,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )

  const mintedHash = await klaytnSDK.nft.mintNFT({
    chain: 'KCS',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
  })

  const mintedWithMinterHash = await klaytnSDK.nft.mintNFT({
    chain: 'KCS',
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  })
}
