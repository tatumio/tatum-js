import { TatumOneSDK } from '@tatumio/one'
import { Currency, TransactionHash } from '@tatumio/api-client'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneNftExample() {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://faucet.pops.one/

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  const { txId } = (await oneSDK.nft.deployNFTSmartContract({
    chain: 'ONE',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    // your private key of the address that has coins
    fromPrivateKey,
  })) as TransactionHash

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await oneSDK.blockchain.smartContractGetAddress('ONE', txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await oneSDK.nft.mintNFT({
    chain: 'ONE',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
    to,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get NFT token metadata
  const { data } = await oneSDK.nft.getNFTMetadataURI(Currency.ONE, contractAddress, '100000')

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await oneSDK.nft.getNFTAccountBalance(Currency.ONE, address, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await oneSDK.nft.transferNFT({
    chain: 'ONE',
    value: '1',
    to,
    tokenId: '1000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await oneSDK.nft.burnNFT({
    chain: 'ONE',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
