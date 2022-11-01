import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency, TransactionHash } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function polygonNftExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet })
  // Generate private keys
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const fromPrivateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet })
  const destinationPrivateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, {
    testnet,
  })
  // Generate source and destination addresses
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const address = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = polygonSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // Create NFTs on your own smart contract
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const nftCreated = (await polygonSDK.nft.deployNFTSmartContract({
    chain: Currency.MATIC,
    name: 'HELLO MATIC',
    symbol: 'HELLO_NFT',
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Created nft with transaction ID: ${nftCreated.txId}`)

  // fetch created contract address from transaction hash
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetContractAddress
  const { contractAddress } = await polygonSDK.nft.getNFTContractAddress(Currency.MATIC, nftCreated.txId)
  console.log(`Created NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const tokenId = '123456'
  const nftMinted = (await polygonSDK.nft.mintNFT({
    chain: Currency.MATIC,
    tokenId,
    contractAddress: contractAddress as string,
    to,
    fromPrivateKey,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash
  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await polygonSDK.nft.getNFTAccountBalance(
    Currency.MATIC,
    address,
    contractAddress as string,
  )
  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Get NFT token metadata
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const data = await polygonSDK.nft.getNFTMetadataURI(Currency.MATIC, contractAddress as string, tokenId)
  console.log(`Token metadata: ${JSON.stringify(data)}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await polygonSDK.nft.transferNFT({
    chain: Currency.MATIC,
    to,
    tokenId,
    contractAddress: contractAddress as string,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await polygonSDK.nft.burnNFT({
    chain: Currency.MATIC,
    tokenId,
    contractAddress: contractAddress as string,
    fromPrivateKey: destinationPrivateKey,
  })) as TransactionHash
  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
