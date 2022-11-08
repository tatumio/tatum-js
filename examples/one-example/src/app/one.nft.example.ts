import { TatumOneSDK } from '@tatumio/one'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneNftExample() {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const account = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '100000'

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

  console.log('Deployed nft contract with tx hash: ', txId)

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransaction
  const transactionData = await oneSDK.blockchain.get(txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await oneSDK.nft.mintNFT({
    chain: 'ONE',
    tokenId,
    contractAddress,
    fromPrivateKey,
    to: account,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get NFT token metadata
  const { data } = await oneSDK.nft.getNFTMetadataURI(Currency.ONE, contractAddress, '100000')

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await oneSDK.nft.getNFTAccountBalance(Currency.ONE, account, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await oneSDK.nft.transferNFT({
    chain: 'ONE',
    to,
    tokenId,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await oneSDK.nft.burnNFT({
    chain: 'ONE',
    tokenId,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
