import { TransactionHash } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const oneAuctionExample = async () => {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const seller = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const auctionId = 'generateUniqueId'
  const erc20ContractAddress = 'replaceMeWithErc20ContractAddress'
  const nftTokenId = 'replaceMeWithNftTokenId'
  const nftContractAddress = 'replaceMeWithNftContractAddress'

  const deployedAuction = (await oneSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'ONE',
    auctionFee: 100,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransaction
  const transaction = await oneSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  console.log(`Deployed auction sc: ${contractAddress} }`)

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve

  const erc20Approved = (await oneSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
    chain: 'ONE',
    // address of the new spender.
    spender: seller,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
    amount: '100',
  })) as TransactionHash

  console.log('Approved spending of erc20 token with tx id: ', erc20Approved.txId)

  // Before creating an auction make sure to approve the spending of an nft:
  // https://apidoc.tatum.io/tag/Auction#operation/ApproveNftAuctionSpending

  const nftApproved = (await oneSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'ONE',
    // address of the new spender.
    spender: seller,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)

  const createdAuction = (await oneSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'ONE',
    contractAddress,
    // contract address of the nft to sell
    nftAddress: nftContractAddress,
    seller,
    id: auctionId,
    tokenId: nftTokenId,
    endedAt: 3170398,
    isErc721: true,
    fromPrivateKey,
  })) as TransactionHash

  console.log('Created auction with tx id: ', createdAuction.txId)

  const auction = await oneSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log('Auction details: ', auction)

  const { txId: bidTransactionHash } = (await oneSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'ONE',
    contractAddress,
    id: auctionId,
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await oneSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'ONE',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await oneSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      chain: 'ONE',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
