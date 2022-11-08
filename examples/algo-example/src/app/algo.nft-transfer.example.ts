import { TatumAlgoSDK, TransferAlgoBlockchain } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import { isTestnet, sdkArguments } from '../index'

export async function algoNftTransferExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Send Algos to a recipient account using private key, to be able accept token
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const txData = (await algoSDK.transaction.send.signedTransaction(
    {
      amount: '2',
      fromPrivateKey,
      to,
    } as TransferAlgoBlockchain,
    isTestnet,
  )) as TransactionHash
  console.log(`Fund recipient account ${to} with ID ${txData.txId}`)

  // Mint NFTs on your own smart contract
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const nftMinted = (await algoSDK.token.nft.send.createNFTSignedTransaction(
    {
      name: 'HELLO-ALGO',
      fromPrivateKey,
      // uploaded metadata from ipfs
      url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
      attr: {
        manager: address,
      },
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch created contract address from transaction hash
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, nftMinted.txId)
  console.log(`Created NFT smart contract with contract address: ${contractAddress}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await algoSDK.token.nft.getNFTAccountBalance(
    Currency.ALGO,
    address,
    contractAddress,
  )
  console.log(`Nfts on ${contractAddress}: ${JSON.stringify(nftAccountBalance)}`)

  // Enable receiving asset on account
  // https://docs.tatum.io/nft-express/use-nft-express-to-mint-nfts-on-algorand
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.token.receiveAsset(
    {
      assetId: new BigNumber(contractAddress).toNumber(),
      fromPrivateKey: recipientAddress.secret,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Enabled nft with transaction hash: ${assetEnabled.txId}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await algoSDK.token.nft.send.transferNFTSignedTransaction(
    {
      to,
      contractAddress,
      value: '1',
      fromPrivateKey,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Transferred nft with transaction hash: ${nftTransferred.txId}`)

  // commented due to "manager" doesnt own asset - it was transferred to another address
  // // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  // const nftBurned = (await algoSDK.token.nft.send.burnNFTSignedTransaction(
  //   {
  //     contractAddress,
  //     fromPrivateKey,
  //   },
  //   isTestnet,
  // )) as TransactionHash
  // console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
