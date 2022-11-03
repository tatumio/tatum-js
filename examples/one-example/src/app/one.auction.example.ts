import { TransactionHash } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const oneAuctionExample = async () => {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const feeRecipient = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  const txId = await oneSDK.marketplace.auction.prepare.deployAuctionSignedTransaction({
    chain: 'ONE',
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

  const { txId: bidTransactionHash } = (await oneSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'ONE',
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await oneSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'ONE',
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await oneSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      chain: 'ONE',
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
