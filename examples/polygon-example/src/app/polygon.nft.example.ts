import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonNftExample() {
  const metadataURI = await polygonSDK.nft.getNFTMetadataURI(
    Currency.MATIC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await polygonSDK.nft.getNFTProvenanceData(
    Currency.MATIC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await polygonSDK.nft.getNFTRoyalty(
    Currency.MATIC,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await polygonSDK.nft.getNFTTransaction(
    Currency.MATIC,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionByAddress = await polygonSDK.nft.getNFTTransactionsByAddress(
    Currency.MATIC,
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transactionByToken = await polygonSDK.nft.getNFTTransactionsByToken(
    Currency.MATIC,
    1,
    '0x1ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const nftByAddress = await polygonSDK.nft.getNFTsByAddress(
    Currency.MATIC,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  // TODO bug in openapi - chain and feeCurrency
  // const minted = await polygonSDK.nft.mintNFT({
  //   chain: Currency.MATIC,
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
  //   feeCurrency: Currency.MATIC
  // })

  await polygonSDK.nft.prepareAddNFTMinterAbstraction(
    Currency.MATIC,
    '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    '1000',
  )
}
