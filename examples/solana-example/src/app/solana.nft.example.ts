import { TatumSolanaSDK } from '@tatumio/solana'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaNftExample() {
  const metadataURI = await solanaSDK.nft.getNFTMetadataURI(
    'SOL',
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1',
  )

  const royalty = await solanaSDK.nft.getNFTRoyalty('SOL', '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326', '1')

  const minted = await solanaSDK.transaction.mintNft({
    chain: 'SOL',
    to: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    fromPrivateKey:
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
    metadata: {
      name: 'My NFT.',
      symbol: 'NFT_SYMBOL',
      sellerFeeBasisPoints: 0,
      uri: 'https://my_token_data.com',
      creators: [],
    },
  })

  const transferred = await solanaSDK.transaction.transferNft({
    chain: 'SOL',
    to: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    fromPrivateKey:
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
    contractAddress: minted.nftAddress,
  })
}
