import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoNftExample() {
  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const nftMinted = (await algoSDK.nft.mintNFT({
    chain: Currency.ALGO,
    name: 'HELLO-ALGO',
    fromPrivateKey,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    attr: {
      manager: address,
    },
  })) as TransactionHash
  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch created contract address from transaction hash
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetContractAddress
  const { contractAddress } = await algoSDK.nft.getNFTContractAddress(Currency.ALGO, nftMinted.txId)
  console.log(`Created NFT smart contract with contract address: ${contractAddress}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await algoSDK.nft.getNFTAccountBalance(Currency.ALGO, address, contractAddress)
  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Enable receiving asset on account
  // https://docs.tatum.io/nft-express/use-nft-express-to-mint-nfts-on-algorand
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.blockchain.receiveAsset({
    assetId: new BigNumber(contractAddress).toNumber(),
    fromPrivateKey: recipientAddress.secret,
  })) as TransactionHash
  console.log(`Enabled nft with transaction hash: ${assetEnabled.txId}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await algoSDK.nft.transferNFT({
    chain: Currency.ALGO,
    to,
    tokenId: contractAddress,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await algoSDK.nft.burnNFT({
    chain: Currency.ALGO,
    contractAddress,
    fromPrivateKey: recipientAddress.secret,
  })) as TransactionHash
  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
