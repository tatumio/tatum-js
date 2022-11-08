import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { Currency, TransactionHash } from '@tatumio/api-client'

const tatumSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnNftExample() {
  const { mnemonic, xpub } = await tatumSDK.wallet.generateWallet()
  const fromPrivateKey = await tatumSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = tatumSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = tatumSDK.wallet.generateAddressFromXPub(xpub, 1)
  const fromPrivateKeyTo = await tatumSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1)
  const tokenId = '100000'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet
  console.log(`Address: ${address} with private key: ${fromPrivateKey}`)
  console.log(`Another address: ${to} with private key: ${fromPrivateKeyTo}`)

  // Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  const { txId } = (await tatumSDK.nft.deployNFTSmartContract({
    chain: 'KLAY',
    name: 'My ERC721',
    symbol: 'ERC_SYMBOL',
    // your private key of the address that has coins
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Deployed nft smart contract with transaction id: ${txId}`)

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await tatumSDK.blockchain.smartContractGetAddress('KLAY', txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await tatumSDK.nft.mintNFT({
    chain: 'KLAY',
    tokenId,
    contractAddress,
    fromPrivateKey,
    to: address,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Get NFT token metadata
  const { data } = await tatumSDK.nft.getNFTMetadataURI(Currency.KLAY, contractAddress, tokenId)

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  const nftAccountBalance = await tatumSDK.nft.getNFTAccountBalance(Currency.KLAY, address, contractAddress)

  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await tatumSDK.nft.transferNFT({
    chain: 'KLAY',
    to,
    tokenId,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transaction hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // Since we previously transferred token to new address we now use private key of that address to burn the token
  const nftBurned = (await tatumSDK.nft.burnNFT({
    chain: 'KLAY',
    tokenId,
    contractAddress,
    fromPrivateKey: fromPrivateKeyTo,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
