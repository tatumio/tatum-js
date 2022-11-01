import { TatumKcsSDK } from '@tatumio/kcs'
import { TransactionHash } from '@tatumio/api-client'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const kcsAuctionExample = async () => {
  const { mnemonic, xpub } = await kcsSDK.wallet.generateWallet()
  const fromPrivateKey = await kcsSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const feeRecipient = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = kcsSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://faucet-testnet.kcc.network
  const { txId } = (await kcsSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`TransactionId: ${txId}`)

  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetTransaction
  const transaction = await kcsSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  // https://apidoc.tatum.io/tag/Auction#operation/GetAuction
  const auction = await kcsSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  // https://apidoc.tatum.io/tag/Auction#operation/BidOnAuction
  const { txId: bidTransactionHash } = await kcsSDK.marketplace.auction.send.auctionBidSignedTransaction({
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
  })

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  // https://apidoc.tatum.io/tag/Auction#operation/CancelAuction
  const { txId: cancelTransactionHash } =
    await kcsSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  // https://apidoc.tatum.io/tag/Auction#operation/SettleAuction
  const { txId: settleTransactionHash } =
    await kcsSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
