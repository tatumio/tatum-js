import { TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethNftExpressExample() {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()
  const fromPrivateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = ethSDK.wallet.generateAddressFromXPub(xpub, 1)

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const nftMinted = (await ethSDK.nft.mintNFT({
    chain: 'ETH',
    to,
    // uploaded metadata from ipfs from tutorial above
    url: 'https://my_token_data.com',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const deployedTransaction = await ethSDK.blockchain.smartContractGetAddress('ETH', nftMinted.txId)
  const contractAddress = deployedTransaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await ethSDK.nft.transferNFT({
    chain: 'ETH',
    value: '1',
    to,
    tokenId: '1000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await ethSDK.nft.burnNFT({
    chain: 'ETH',
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)

  // Minting NFTs with NFT Express using your own smart contract
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const mintedWithMinter = (await ethSDK.nft.mintNFT({
    chain: 'ETH',
    to,
    url: 'https://my_token_data.com',
    tokenId: '100000',
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0xc16ae5e8c985b906935a0cadf4e24f0400531883',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
