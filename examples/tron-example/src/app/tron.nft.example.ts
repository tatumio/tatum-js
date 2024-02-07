import { TatumTronSDK } from '@tatumio/tron'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleep } from '@tatumio/shared-abstract-sdk'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronNftExample() {
  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2

  // This address wil DEPLOY, MINT and TRANSFER NFT to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE'

  // This address will RECEIVE NFT and BURN it
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  const tokenId = '1000'

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const { txId } = (await tronSdk.nft.send.deploySignedTransaction({
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    fromPrivateKey: senderPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`Created NFT contract with transaction ID ${txId}`)
  console.log(`Waiting 120 seconds for the transaction [${txId}] to appear in a block`)
  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  await sleep(120_000)

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await tronSdk.blockchain.smartContractGetAddress('TRON', txId)
  const contractAddress = transactionData.contractAddress as string

  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Please note that minted tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // Mint NFTs on your own smart contract
  const nftMinted = (await tronSdk.nft.send.mintSignedTransaction({
    contractAddress,
    fromPrivateKey: senderPrivateKey,
    to: senderAddress,
    tokenId,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)
  console.log(`Waiting 120 seconds for the transaction [${nftMinted.txId}] to appear in a block`)
  await sleep(120_000)

  // Get NFT token metadata
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const response = await tronSdk.nft.getNFTMetadataURI(Currency.TRON, contractAddress, tokenId)

  console.log(`Token metadata: ${JSON.stringify(response)}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await tronSdk.nft.getNFTAccountBalance(
    Currency.TRON,
    senderAddress,
    contractAddress,
  )

  console.log(`Nfts on ${senderAddress}`)
  console.log(JSON.stringify(nftAccountBalance))

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await tronSdk.nft.send.transferSignedTransaction({
    to: receiverAddress,
    tokenId,
    contractAddress,
    fromPrivateKey: senderPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)
  console.log(`Waiting 120 seconds for the transaction [${nftTransferred.txId}] to appear in a block`)
  await sleep(120_000)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await tronSdk.nft.send.burnSignedTransaction({
    tokenId,
    contractAddress,
    fromPrivateKey: receiverPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
