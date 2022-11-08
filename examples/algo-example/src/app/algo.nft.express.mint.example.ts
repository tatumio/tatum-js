import { MintNftAlgo, TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { isTestnet, sdkArguments } from '../index'

export async function algoNftExpressExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const nftMinted = (await algoSDK.token.nft.createNFTSignedTransaction(
    {
      name: 'HELLO-ALGO',
      // uploaded metadata from ipfs from tutorial above
      url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
      attr: {
        manager: address,
      },
    } as MintNftAlgo,
    isTestnet,
  )) as TransactionHash
  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, nftMinted.txId)
  console.log(`Created NFT smart contract with contract address: ${contractAddress}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await algoSDK.token.nft.burnNFTSignedTransaction({
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
