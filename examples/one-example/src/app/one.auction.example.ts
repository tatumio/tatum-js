import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const oneAuctionExample = async () => {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const feeRecipient = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  const txId = await oneSDK.marketplace.auction.prepare.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
  })

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransaction
  const transaction = await oneSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  const auction = await oneSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = await oneSDK.marketplace.auction.send.auctionBidSignedTransaction({
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
  })

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    await oneSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    await oneSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
