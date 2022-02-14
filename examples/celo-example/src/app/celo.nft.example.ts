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
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  // TODO bug in openapi - chain and feeCurrency
  // const minted = await celoSDK.nft.mintNFT({
  //   chain: Currency.CELO,
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
  //   feeCurrency: Currency.CELO
  // })

  await celoSDK.nft.prepareAddNFTMinterAbstraction(
    Currency.CELO,
    '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    '1000',
  )
}
