import { TransactionHash } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
// TODO: change examples after evm auction fix
export const celoAuctionExample = async () => {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const feeRecipient = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://celo.org/developers/faucet
  const { txId } = (await celoSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
    chain: 'CELO',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`TransactionId: ${txId}`)

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransaction
  const transaction = await celoSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  const auction = await celoSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = (await celoSDK.marketplace.auction.send.auctionBidSignedTransaction({
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
    chain: 'CELO',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await celoSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
      chain: 'CELO',
      feeCurrency: 'CELO',
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await celoSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      contractAddress,
      id: 'string',
      fromPrivateKey,
      chain: 'CELO',
      feeCurrency: 'CELO',
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
