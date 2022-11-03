import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const bscAuctionExample = async () => {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const feeRecipient = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://testnet.binance.org/faucet-smart
  const { txId } = (await bscSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
    chain: 'BSC',
  })) as TransactionHash

  console.log(`TransactionId: ${txId}`)

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  const auction = await bscSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = (await bscSDK.marketplace.auction.send.auctionBidSignedTransaction({
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
    chain: 'BSC',
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await bscSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
      chain: 'BSC',
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await bscSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
      chain: 'BSC',
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
