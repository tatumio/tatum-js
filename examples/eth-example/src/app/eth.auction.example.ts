import { TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const ethAuctionExample = async () => {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddressPrivateKey
  const fromPrivateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const seller = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
  const auctionId = 'generateUniqueId'
  const erc20ContractAddress = 'replaceMeWithErc20ContractAddress'
  const nftTokenId = 'replaceMeWithNftTokenId'
  const nftContractAddress = 'replaceMeWithNftContractAddress'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://faucet.sepolia.dev/

  const deployedAuction = (await ethSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'ETH',
    auctionFee: 100,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransaction
  const transaction = await ethSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve

  const erc20Approved = (await ethSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
    chain: 'ETH',
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

  const nftApproved = (await ethSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'ETH',
    // address of the new spender.
    spender: seller,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)

  const createdAuction = (await ethSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'ETH',
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

  const auction = await ethSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const bidTransactionHash = (await ethSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'ETH',
    contractAddress,
    id: auctionId,
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash.txId}`)

  const cancelTransactionHash = (await ethSDK.marketplace.auction.send.auctionCancelSignedTransaction({
    chain: 'ETH',
    contractAddress,
    id: auctionId,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash.txId}`)

  const settleTransactionHash = (await ethSDK.marketplace.auction.send.auctionSettleSignedTransaction({
    chain: 'ETH',
    contractAddress,
    id: auctionId,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash.txId}`)
}
