import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency } from '@tatumio/api-client'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
 */
export async function solanaNftExample() {
  // Lets mint new NFT on Solana
  const { txId, nftAddress } = (await solanaSDK.transaction.mintNft({
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
  })) as { txId: string; nftAddress: string }
  console.log(`Minted NFT: ${nftAddress} in tx: ${txId}`)

  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const metadata = await solanaSDK.nft.getNFTMetadataURI(Currency.SOL, nftAddress, '')
  console.log(`Metadata of NFT: ${metadata}`)

  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetRoyaltyErc721
  const royalty = await solanaSDK.nft.getNFTRoyalty(Currency.SOL, nftAddress, '')
  console.log(`Royalty of NFT: ${royalty}`)

  const { txId: transferTx } = (await solanaSDK.transaction.transferNft({
    chain: Currency.SOL,
    to: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    fromPrivateKey:
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
    contractAddress: nftAddress,
  })) as { txId: string }
  console.log(`Transfered NFT: ${nftAddress} in tx: ${transferTx}`)
}
