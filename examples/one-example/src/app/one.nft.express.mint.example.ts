import { TatumOneSDK } from '@tatumio/one'
import { TransactionHash } from '@tatumio/api-client'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneNftExpressExample() {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '1000'

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  const nftMinted = (await oneSDK.nft.mintNFT({
    chain: 'ONE',
    to: address,
    // uploaded metadata from ipfs from tutorial above
    url: 'https://my_token_data.com',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const deployedTransaction = await oneSDK.blockchain.get(nftMinted.txId)
  const contractAddress = deployedTransaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

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

  // Minting NFTs with NFT Express using your own smart contract
  const mintedWithMinter = (await oneSDK.nft.mintNFT({
    chain: 'ONE',
    to: address,
    url: 'https://my_token_data.com',
    tokenId,
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0x8906f62d40293ddca77fdf6714c3f63265deddf0',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
