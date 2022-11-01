import { TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const ethAuctionExample = async () => {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddressPrivateKey
  const fromPrivateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const feeRecipient = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = ethSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://faucet.sepolia.dev/
  const { txId } = (await ethSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`TransactionId: ${txId}`)

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransaction
  const transaction = await ethSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  const auction = await ethSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = await ethSDK.marketplace.auction.send.auctionBidSignedTransaction({
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
  })

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    await ethSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    await ethSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
