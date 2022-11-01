import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency, TransactionHash } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function polygonNftExpressExample() {
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

  // Mint NFT using NTF Express with the pre-built smart contract provided by Tatum
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const nftMintedExpress = (await polygonSDK.nft.mintNFT({
    chain: Currency.MATIC,
    to,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash
  console.log(`Minted nft with NFT express: transaction ID: ${nftMintedExpress.txId}`)

  // Mint NFT using NTF Express with the pre-built smart contract provided by Tatum
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const tokenId = '1234'
  // minter address testnet:
  // https://docs.tatum.io/nft-express/use-nft-express-with-your-own-smart-contract
  const minter = '0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5'
  const nftMinter = (await polygonSDK.nft.mintNFT({
    chain: Currency.MATIC,
    contractAddress: contractAddress as string,
    tokenId,
    minter,
    to,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash
  console.log(`Minted nft with minter: transaction ID: ${nftMinter.txId}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await polygonSDK.nft.getNFTAccountBalance(
    Currency.MATIC,
    address,
    contractAddress as string,
  )
  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

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
