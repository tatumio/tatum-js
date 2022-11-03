import { TatumKcsSDK } from '@tatumio/kcs'
import { Currency, TransactionHash } from '@tatumio/api-client'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsNftExample() {
  const { mnemonic, xpub } = await kcsSDK.wallet.generateWallet()
  const fromPrivateKey = await kcsSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = kcsSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://faucet-testnet.kcc.network

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const { txId } = (await kcsSDK.nft.deployNFTSmartContract({
    chain: 'KCS',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    // your private key of the address that has coins
    fromPrivateKey,
  })) as TransactionHash

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await kcsSDK.blockchain.smartContractGetAddress('KCS' as any, txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await kcsSDK.nft.mintNFT({
    chain: 'KCS',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
    to,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get NFT token metadata
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const { data } = await kcsSDK.nft.getNFTMetadataURI(Currency.KCS, contractAddress, '100000')

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await kcsSDK.nft.getNFTAccountBalance(Currency.KCS, address, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await kcsSDK.nft.transferNFT({
    chain: 'KCS',
    value: '1',
    to,
    tokenId: '1000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await kcsSDK.nft.burnNFT({
    chain: 'KCS',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
