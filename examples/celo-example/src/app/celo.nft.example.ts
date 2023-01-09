import { TatumCeloSDK } from '@tatumio/celo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 20
const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://celo.org/developers/faucet
 */
export async function celoNftExample() {
  // This address wil DEPLOY, MINT and TRANSFER NFT to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE NFT and BURN it
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  const tokenId = '1000'

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const nftDeploy = (await celoSDK.nft.send.deploySignedTransaction({
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    // your private key of the address that has coins
    fromPrivateKey: senderPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftDeploy.txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await celoSDK.blockchain.smartContractGetAddress(Currency.CELO, nftDeploy.txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Please note that minted tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // Mint NFTs on your own smart contract
  const nftMinted = (await celoSDK.nft.send.mintSignedTransaction({
    tokenId,
    contractAddress,
    fromPrivateKey: senderPrivateKey,
    feeCurrency: 'CELO',
    to: senderAddress,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with txID: ${nftMinted.txId}`)
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftMinted.txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // Get NFT token metadata
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const response = await celoSDK.nft.getNFTMetadataURI(Currency.CELO, contractAddress, tokenId)

  console.log(`Token metadata: ${JSON.stringify(response)}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await celoSDK.nft.getNFTAccountBalance(
    Currency.CELO,
    senderAddress,
    contractAddress,
  )

  console.log(`Nfts on ${contractAddress}:`, nftAccountBalance)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await celoSDK.nft.send.transferSignedTransaction({
    to: receiverAddress,
    tokenId,
    contractAddress,
    fromPrivateKey: senderPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await celoSDK.nft.send.burnSignedTransaction({
    tokenId,
    contractAddress,
    fromPrivateKey: receiverPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`NFT burn transaction sent with txID: ${nftBurned.txId}`)
}
