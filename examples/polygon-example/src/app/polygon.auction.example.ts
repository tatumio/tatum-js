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
  const seller = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  const auctionId = 'generateUniqueId'
  const erc20ContractAddress = 'replaceMeWithErc20ContractAddress'
  const nftTokenId = 'replaceMeWithNftTokenId'
  const nftContractAddress = 'replaceMeWithNftContractAddress'

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  const deployedAuction = (await polygonSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'MATIC',
    auctionFee: 100,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)

  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const transaction = await polygonSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve

  const erc20Approved =
    (await polygonSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
      chain: 'MATIC',
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

  const nftApproved = (await polygonSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'MATIC',
    // address of the new spender.
    spender: seller,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)

  const createdAuction = (await polygonSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'MATIC',
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

  const auction = await polygonSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = (await polygonSDK.marketplace.auction.send.auctionBidSignedTransaction(
    {
      chain: 'MATIC',
      contractAddress,
      id: auctionId,
      bidValue: '1',
      fromPrivateKey,
    },
  )) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await polygonSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'MATIC',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await polygonSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      chain: 'MATIC',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
