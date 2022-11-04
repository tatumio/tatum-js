import { TransactionHash } from '@tatumio/api-client'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const klaytnAuctionExample = async () => {
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddress
  const seller = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)
  const auctionId = 'generateUniqueId'
  const erc20ContractAddress = 'replaceMeWithErc20ContractAddress'
  const nftTokenId = 'replaceMeWithNftTokenId'
  const nftContractAddress = 'replaceMeWithNftContractAddress'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  const deployedAuction = (await klaytnSDK.marketplace.auction.send.deployAuctionSignedTransaction({
    chain: 'KLAY',
    auctionFee: 100,
    feeRecipient: seller,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed auction with id: ${deployedAuction.txId}`)

  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetTransaction
  const transaction = await klaytnSDK.blockchain.get(deployedAuction.txId)
  const contractAddress = transaction.contractAddress as string

  // Allow another blockchain address to spend and burn fungible tokens on behalf of the smart contract owner
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve

  const erc20Approved =
    (await klaytnSDK.marketplace.auction.send.auctionApproveErc20TransferSignedTransaction({
      chain: 'KLAY',
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

  const nftApproved = (await klaytnSDK.marketplace.auction.send.auctionApproveNftTransferSignedTransaction({
    chain: 'KLAY',
    // address of the new spender.
    spender: seller,
    isErc721: true,
    tokenId: nftTokenId,
    // contract address of erc20 token used for buying NFT asset from the marketplace
    contractAddress: erc20ContractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Approved spending of nft with tx id: ${nftApproved.txId}`)

  const createdAuction = (await klaytnSDK.marketplace.auction.send.createAuctionSignedTransaction({
    chain: 'KLAY',
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

  const auction = await klaytnSDK.marketplace.auction.getAuction(contractAddress, auctionId)

  console.log(`Auction from contract address ${contractAddress}: ${auction}`)

  const { txId: bidTransactionHash } = (await klaytnSDK.marketplace.auction.send.auctionBidSignedTransaction({
    chain: 'KLAY',
    contractAddress,
    id: auctionId,
    bidValue: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Auction bid transaction hash: ${bidTransactionHash}`)

  const { txId: cancelTransactionHash } =
    (await klaytnSDK.marketplace.auction.send.auctionCancelSignedTransaction({
      chain: 'KLAY',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction cancel transaction hash: ${cancelTransactionHash}`)

  const { txId: settleTransactionHash } =
    (await klaytnSDK.marketplace.auction.send.auctionSettleSignedTransaction({
      chain: 'KLAY',
      contractAddress,
      id: auctionId,
      fromPrivateKey,
    })) as TransactionHash

  console.log(`Auction settle transaction hash: ${settleTransactionHash}`)
}
