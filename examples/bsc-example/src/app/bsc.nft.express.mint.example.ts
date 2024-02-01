import { TatumBscSDK } from '@tatumio/bsc'
import { TransactionHash } from '@tatumio/api-client'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscNftExpressExample() {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  const nftMinted = (await bscSDK.nft.mintNFT({
    chain: 'BSC',
    to,
    // uploaded metadata from ipfs from tutorial above
    url: 'https://my_token_data.com',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // Please note that minted tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const deployedTransaction = await bscSDK.blockchain.smartContractGetAddress('BSC', nftMinted.txId)
  const contractAddress = deployedTransaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await bscSDK.nft.transferNFT({
    chain: 'BSC',
    to,
    tokenId: '1000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await bscSDK.nft.burnNFT({
    chain: 'BSC',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)

  // Minting NFTs with NFT Express using your own smart contract
  const mintedWithMinter = (await bscSDK.nft.mintNFT({
    chain: 'BSC',
    to,
    url: 'https://my_token_data.com',
    tokenId: '100000',
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0xc16ae5e8c985b906935a0cadf4e24f0400531883',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
