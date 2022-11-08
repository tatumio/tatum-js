import { TatumPolygonSDK } from '@tatumio/polygon'
import { TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 60
const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.polygon.technology
 */
export async function polygonAuctionExample() {
  // In this example, create an auction, bid will be the same address
  // But in a real application, different accounts will do this.
  const seller = '<PUT SELLER ADDRESS HERE>'
  const fromPrivateKey = '<PUT SELLER PRIVATE KEY HERE>'

  // Auction ID
  const auctionId = '1'
  // In this example, the bet will be in ERC20 token. The seller must have these tokens on his balance.
  // If you want to use native currency, you can omit everything related to erc20 in this example
  const erc20ContractAddress = '<PUT ERC20 CONTRACT ADDRESS HERE>'
  // NFT Token Id. Seller must own this NFT
  const nftTokenId = '<PUT NFT TOKEN ID HERE>'
  // NFT Contract Address
  const nftContractAddress = '<PUT NFT CONTRACT ADDRESS HERE>'

  const currentBlockNumber = await polygonSDK.blockchain.getCurrentBlock()
  // On which block number the auction should end
  const auctionBlockEnd = currentBlockNumber + 10_000

  const auctionFee = 100
  // This value must be more than auctionFee. And seller must have these tokens on his balance
  const bidValue = '200'

  // create NFT auction
  // https://apidoc.tatum.io/tag/Auction#operation/GenerateAuction
  const deployedAuction = (await polygonSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'MATIC',
    auctionFee,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${deployedAuction.txId}] to appear in a block`,
  )
  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  await sleepSeconds(SLEEP_SECONDS)

  // get smart contract address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const transaction = await polygonSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve
  const erc20Approved =
    (await polygonSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
      chain: 'MATIC',
      // address of the new spender.
      spender: contractAddress,
      // contract address of erc20 token used for buying NFT asset from the marketplace
      contractAddress: erc20ContractAddress,
      fromPrivateKey,
      amount: bidValue,
    })) as TransactionHash

  console.log('Approved spending of erc20 token with tx id: ', erc20Approved.txId)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${erc20Approved.txId}] to appear in a block`,
  )

  await sleepSeconds(SLEEP_SECONDS)

  // Before creating an auction make sure to approve the spending of a nft:
  // https://apidoc.tatum.io/tag/Auction#operation/ApproveNftAuctionSpending
  const nftApproved = (await polygonSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'MATIC',
    // address of the new spender.
    spender: contractAddress,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftApproved.txId}] to appear in a block`,
  )

  await sleepSeconds(SLEEP_SECONDS)

  // Create Auction
  // https://apidoc.tatum.io/tag/Auction#operation/CreateAuction
  const createdAuction = (await polygonSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'MATIC',
    contractAddress,
    // contract address of the nft to sell
    nftAddress: nftContractAddress,
    erc20Address: erc20ContractAddress,
    seller,
    id: auctionId,
    tokenId: nftTokenId,
    // On which block number the auction should end
    endedAt: auctionBlockEnd,
    isErc721: true,
    fromPrivateKey,
  })) as TransactionHash

  console.log('Created auction with tx id: ', createdAuction.txId)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${createdAuction.txId}] to appear in a block`,
  )

  await sleepSeconds(SLEEP_SECONDS)

  // Get Auctions Details
  // https://apidoc.tatum.io/tag/Auction#operation/GetAuction
  const auction = await polygonSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log(`Auction from contract address ${contractAddress}`)
  console.log(JSON.stringify(auction))

  // Auction Bid
  // https://apidoc.tatum.io/tag/Auction#operation/BidOnAuction
  const { txId: bidTransactionHash } = (await polygonSDK.marketplace.auction.send.auctionBidSignedTransaction(
    {
      chain: 'MATIC',
      contractAddress,
      id: auctionId,
      bidValue: bidValue,
      fromPrivateKey,
    },
  )) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${bidTransactionHash}] to appear in a block`,
  )

  await sleepSeconds(SLEEP_SECONDS)

  // You can cancel the auction or settle it (if the end block is reached).
  // Uncomment the call you want to make

  // Cancel auction
  // https://apidoc.tatum.io/tag/Auction#operation/CancelAuction
  const { txId: cancelTransactionHash } =
    (await polygonSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'MATIC',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  // Settle Auction
  // https://apidoc.tatum.io/tag/Auction#operation/SettleAuction
  // const { txId: settleTransactionHash } =
  //   (await polygonSDK.marketplace.auction.send.auctionSettleSignedTransaction({
  //     chain: 'MATIC',
  //     contractAddress,
  //     id: auctionId,
  //     fromPrivateKey,
  //   })) as TransactionHash
  //
  // console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
