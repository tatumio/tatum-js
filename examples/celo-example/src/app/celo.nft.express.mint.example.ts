import { TatumCeloSDK } from '@tatumio/celo'
import { TransactionHash } from '@tatumio/api-client'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoNftExpressExample() {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://celo.org/developers/faucet
  console.log(`Fund me: ${address}!`)

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  const nftMinted = (await celoSDK.nft.mintNFT({
    chain: 'CELO',
    to,
    // uploaded metadata from ipfs from tutorial above
    url: 'https://my_token_data.com',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const deployedTransaction = await celoSDK.blockchain.smartContractGetAddress('CELO', nftMinted.txId)
  const contractAddress = deployedTransaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

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
    tokenId: '100000',
    contractAddress,
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)

  // Minting NFTs with NFT Express using your own smart contract
  const mintedWithMinter = (await celoSDK.nft.mintNFT({
    chain: 'CELO',
    to,
    url: 'https://my_token_data.com',
    tokenId: '100000',
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0xc16ae5e8c985b906935a0cadf4e24f0400531883',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
