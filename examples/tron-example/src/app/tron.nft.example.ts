import { TatumTronSDK } from '@tatumio/tron'
import { Currency, TransactionHash } from '@tatumio/api-client'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronNftExample() {
  const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()
  const fromPrivateKey = await tronSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = tronSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = tronSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '1000'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  const { txId } = (await tronSDK.nft.deployNFTSmartContract({
    chain: 'TRON',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    fromPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await tronSDK.blockchain.smartContractGetAddress('TRON', txId)
  const contractAddress = transactionData.contractAddress as string

  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await tronSDK.nft.mintNFT({
    chain: 'TRON',
    contractAddress,
    fromPrivateKey,
    to,
    tokenId,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get your NFT token metadata
  const { data } = await tronSDK.nft.getNFTMetadataURI(Currency.TRON, contractAddress, tokenId)

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await tronSDK.nft.getNFTAccountBalance(Currency.TRON, address, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await tronSDK.nft.transferNFT({
    chain: 'TRON',
    value: '1',
    to,
    tokenId,
    contractAddress,
    fromPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await tronSDK.nft.burnNFT({
    chain: 'TRON',
    tokenId,
    contractAddress,
    fromPrivateKey,
    feeLimit: 5000,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
