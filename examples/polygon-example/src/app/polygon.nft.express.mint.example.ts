import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const SLEEP_SECONDS = 25

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.polygon.technology
 */
export async function polygonNftExpressExample() {
  // This address wil MINT and TRANSFER NFT to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE NFT and BURN it
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  const tokenId = 'PUT TOKEN ID FROM TRANSACTION HERE'

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Please note that minted tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // Mint NFTs on your own smart contract
  const nftMinted = (await polygonSDK.nft.mintNFT({
    chain: Currency.MATIC,
    to: senderAddress,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with txID: ${nftMinted.txId}`)
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftMinted.txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // find deployed contract address from transaction hash
  // in this case contract address is under 'to' property since the hash is not from a contract deploy but mint
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const transactionData = await polygonSDK.blockchain.get(nftMinted.txId)
  const contractAddress = transactionData.to as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await polygonSDK.nft.transferNFT({
    chain: Currency.MATIC,
    to: receiverAddress,
    tokenId,
    contractAddress,
    fromPrivateKey: senderPrivateKey,
  })) as TransactionHash

  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await polygonSDK.nft.burnNFT({
    chain: Currency.MATIC,
    tokenId,
    contractAddress,
    fromPrivateKey: receiverPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with txID: ${nftBurned.txId}`)

  // Minting NFTs with NFT Express using your own smart contract
  const mintedWithMinter = (await polygonSDK.nft.mintNFT({
    chain: Currency.MATIC,
    to: senderAddress,
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    tokenId,
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
