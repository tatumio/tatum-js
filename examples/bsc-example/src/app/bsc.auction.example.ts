import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const bscAuctionExample = async () => {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const seller = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const auctionId = 'generateUniqueId'
  const erc20ContractAddress = 'replaceMeWithErc20ContractAddress'
  const nftTokenId = 'replaceMeWithNftTokenId'
  const nftContractAddress = 'replaceMeWithNftContractAddress'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://testnet.binance.org/faucet-smart
  const deployedAuction = (await bscSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'BSC',
    auctionFee: 100,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve

  const erc20Approved = (await bscSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
    chain: 'BSC',
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

  const nftApproved = (await bscSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'BSC',
    // address of the new spender.
    spender: seller,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)

  const createdAuction = (await bscSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'BSC',
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

  const auction = await bscSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const bidTransactionHash = (await bscSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'BSC',
    contractAddress,
    id: auctionId,
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash.txId}`)

  const cancelTransactionHash = (await bscSDK.marketplace.auction.send.auctionCancelSignedTransaction({
    chain: 'BSC',
    contractAddress,
    id: auctionId,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash.txId}`)

  const settleTransactionHash = (await bscSDK.marketplace.auction.send.auctionSettleSignedTransaction({
    chain: 'BSC',
    contractAddress,
    id: auctionId,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash.txId}`)
}
