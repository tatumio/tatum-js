import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 5
const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
 */
export async function solanaNftExample() {
  // This address wil MINT and TRANSFER NFT to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE NFT and BURN it
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  // Lets mint new NFT on Solana
  const { txId, nftAddress } = (await solanaSDK.transaction.send.mintNft({
    to: senderAddress,
    from: senderAddress,
    fromPrivateKey: senderPrivateKey,
    metadata: {
      name: 'My NFT.',
      symbol: 'NFT_SYMBOL',
      sellerFeeBasisPoints: 0,
      uri: 'https://my_token_data.com',
      creators: [
        {
          address: senderAddress,
          share: 100, // means that creator owns 100% of NFT
          verified: true, // means that this creator is signed transaction
        },
      ],
    },
  })) as { txId: string; nftAddress: string }
  console.log(`Minted NFT: ${nftAddress} in tx: ${txId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  // here we omit the 'token' parameter - not needed in solana
  // @ts-ignore - TODO FIX
  const metadata = await solanaSDK.nft.getNFTMetadataURI(Currency.SOL, nftAddress)
  console.log(`Metadata of NFT: ${JSON.stringify(metadata)}`)

  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetRoyaltyErc721
  // here we omit the 'token' parameter - not needed in solana
  const royalty = await solanaSDK.nft.getNFTRoyalty(Currency.SOL, nftAddress)
  console.log(`Royalty of NFT: ${JSON.stringify(royalty)}`)

  const { txId: transferTx } = (await solanaSDK.transaction.send.transferNft({
    to: receiverAddress,
    from: senderAddress,
    fromPrivateKey: senderPrivateKey,
    contractAddress: nftAddress,
  })) as TransactionHash
  console.log(`Transferred NFT: ${nftAddress} in tx: ${transferTx}`)

  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  const { txId: burnTx } = (await solanaSDK.transaction.send.burnNft({
    from: receiverAddress,
    fromPrivateKey: receiverPrivateKey,
    contractAddress: nftAddress,
  })) as TransactionHash
  console.log(`Burned NFT: ${nftAddress} in tx: ${burnTx}`)
}
