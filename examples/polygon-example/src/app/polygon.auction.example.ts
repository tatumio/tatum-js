import { TatumPolygonSDK } from '@tatumio/polygon'
import { TransactionHash } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function polygonAuctionExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet })
  // Generate private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const fromPrivateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet })
  // Generate source and destination addresses
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const feeRecipient = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = polygonSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // create NFT auction
  // https://apidoc.tatum.io/tag/Auction#operation/GenerateAuction
  const { txId } = (await polygonSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
    chain: 'MATIC',
  })) as TransactionHash
  console.log(`TransactionId: ${txId}`)

  // get smart contract address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const transaction = await polygonSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed smart contract ${contractAddress} for NFT auction with transaction ID ${txId}`)

  // auction ID: it's up to the developer to generate unique ID
  const auctionId = '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6'

  // get auction details
  // https://apidoc.tatum.io/tag/Auction#operation/GetAuction
  const auction = await polygonSDK.marketplace.auction.getAuction(contractAddress, auctionId)
  console.log(`Auction from contract address ${contractAddress}: ${JSON.stringify(auction)}`)

  // Bid for asset on auction
  // https://apidoc.tatum.io/tag/Auction#operation/BidOnAuction
  const { txId: bidTransactionHash } = (await polygonSDK.marketplace.auction.send.auctionBidSignedTransaction(
    {
      contractAddress,
      bidder,
      id: auctionId,
      bidValue: '1',
      fromPrivateKey,
      chain: 'MATIC',
    },
  )) as TransactionHash
  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  // Cancel auction
  // https://apidoc.tatum.io/tag/Auction#operation/CancelAuction
  const { txId: cancelTransactionHash } =
    (await polygonSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: auctionId,
      fromPrivateKey,
      chain: 'MATIC',
    })) as TransactionHash
  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  // Settle auction. There must be buyer present for that auction.
  // https://apidoc.tatum.io/tag/Auction#operation/SettleAuction
  const { txId: settleTransactionHash } =
    (await polygonSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: auctionId,
      fromPrivateKey,
      chain: 'MATIC',
    })) as TransactionHash
  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
