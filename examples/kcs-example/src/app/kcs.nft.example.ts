import { TatumKcsSDK } from '@tatumio/kcs'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsNftExample() {
  const metadataURI = await kcsSDK.nft.getNFTMetadataURI(
    Currency.KCS,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await kcsSDK.nft.getNFTProvenanceData(
    Currency.KCS,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await kcsSDK.nft.getNFTRoyalty(
    Currency.KCS,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await kcsSDK.nft.getNFTTransaction(
    Currency.KCS,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const nftByAddress = await kcsSDK.nft.getNFTsByAddress(
    Currency.KCS,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  // TODO bug in openapi - chain and feeCurrency
  // const minted = await kcsSDK.nft.mintNFT({
  //   chain: Currency.KCS,
  //   tokenId: "100000",
  //   to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
  //   erc20: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
  //   contractAddress: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
  //   url: "https://my_token_data.com",
  //   authorAddresses: [
  //     "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"
  //   ],
  //   provenance: true,
  //   cashbackValues: [
  //     "0.5"
  //   ],
  //   fixedValues: [
  //     "0.5"
  //   ],
  //   fromPrivateKey: "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2",
  //   nonce: 0,
  //   feeCurrency: Currency.KCS
  // })

  await kcsSDK.nft.prepareAddNFTMinterAbstraction(
    Currency.KCS,
    '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    '1000',
  )
}
