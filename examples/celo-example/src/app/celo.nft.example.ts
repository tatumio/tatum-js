import { TatumCeloSDK } from '@tatumio/celo'
import { TransactionHash } from '@tatumio/api-client'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoNftExample() {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = 'replaceMeWithTokenId'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://celo.org/developers/faucet

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  const { txId } = (await celoSDK.nft.deployNFTSmartContract({
    chain: 'CELO',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    // your private key of the address that has coins
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await celoSDK.blockchain.smartContractGetAddress('CELO', txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await celoSDK.nft.mintNFT({
    chain: 'CELO',
    tokenId,
    contractAddress,
    fromPrivateKey,
    to,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get NFT token metadata
  const { data } = await celoSDK.nft.getNFTMetadataURI('CELO', contractAddress, tokenId)

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await celoSDK.nft.getNFTAccountBalance('CELO', address, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await celoSDK.nft.transferNFT({
    chain: 'CELO',
    value: '1',
    to,
    tokenId: '1000',
    contractAddress,
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await celoSDK.nft.burnNFT({
    chain: 'CELO',
    tokenId,
    contractAddress,
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
