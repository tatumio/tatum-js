import { TatumTronSDK } from '@tatumio/tron'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronNftExample() {
  const metadataURI = await tronSDK.nft.getNFTMetadataURI(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const provenanceData = await tronSDK.nft.getNFTProvenanceData(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const royalty = await tronSDK.nft.getNFTRoyalty(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )
  const transaction = await tronSDK.nft.getNFTTransaction(
    Currency.ETH,
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionByAddress = await tronSDK.nft.getNFTTransactionsByAddress(
    Currency.ETH,
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transactionByToken = await tronSDK.nft.getNFTTransactionsByToken(
    Currency.ETH,
    1,
    '0x1ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const nftByAddress = await tronSDK.nft.getNFTsByAddress(
    Currency.ETH,
    'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
    '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
  )

  await tronSDK.nft.prepareAddNFTMinterAbstraction(
    Currency.ETH,
    '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    '1000',
  )
}
