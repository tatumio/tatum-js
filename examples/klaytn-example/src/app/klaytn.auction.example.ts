import { TransactionHash } from '@tatumio/api-client'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const klaytnAuctionExample = async () => {
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddress
  const feeRecipient = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)
  const bidder = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  // https://apidoc.tatum.io/tag/Auction#operation/GenerateAuction
  const { txId } = (await klaytnSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'KLAY',
    auctionFee: 100,
    feeRecipient,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`TransactionId: ${txId}`)

  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetTransaction
  const transaction = await klaytnSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed smart contract for NFT auction with transaction ID ${txId}`)

  const auction = await klaytnSDK.marketplace.auction.getAuction(contractAddress, '1')

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = (await klaytnSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'KLAY',
    contractAddress,
    bidder,
    id: 'string',
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await klaytnSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'KLAY',
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await klaytnSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      chain: 'KLAY',
      contractAddress,
      id: 'string',
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
