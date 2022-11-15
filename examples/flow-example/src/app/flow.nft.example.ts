import { Currency, FlowMintedResult, TransactionHash } from '@tatumio/api-client'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })

export async function flowNftExample() {
  // Generate FLOW wallet
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet
  const { mnemonic, xpub } = await flowSDK.wallet.generateWallet()

  // Generate address from xpub
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress
  const { address: firstAddress } = await flowSDK.blockchain.generateAddress(xpub, 0)
  const { address: secondAddress } = await flowSDK.blockchain.generateAddress(xpub, 1)

  const account = firstAddress as string
  // This account will receive NFT and burn it
  const secondAccount = secondAddress as string

  console.log(`First account is ${account}`)
  console.log(`Second account is ${secondAccount}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKeyPrivateKey
  const privateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const secondPrivateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1)

  // Deploy an NFT smart contract on the blockchain.
  // In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  // On FLOW you can deploy only once
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const { txId } = (await flowSDK.nft.deployNFTSmartContract({
    chain: Currency.FLOW,
    account,
    // your private key of the address that has coins
    privateKey,
  })) as TransactionHash

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await flowSDK.blockchain.smartContractGetAddress(Currency.FLOW, txId)
  const contractAddress = transactionData.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on your own smart contract
  const nftMinted = (await flowSDK.nft.send.mintSignedTransaction({
    chain: Currency.FLOW,
    contractAddress,
    account,
    to: account,
    privateKey,
    // uploaded metadata from ipfs
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as FlowMintedResult

  console.log(`Minted nft with transaction ID: ${nftMinted.txId} and token ID: ${nftMinted.tokenId}`)

  const tokenId = nftMinted.tokenId?.toString() as string

  // Get NFT token metadata
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetMetadataErc721
  const { data } = await flowSDK.nft.getNFTMetadataURI(Currency.FLOW, contractAddress, tokenId, account)

  console.log(`Token metadata: ${data}`)

  // Get all minted NFTs in the collection. Returns all NFTs this contract minted.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721
  const nftAccountBalance = await flowSDK.nft.getNFTAccountBalance(Currency.FLOW, account, contractAddress)
  console.log(`Nfts on ${contractAddress}: ${nftAccountBalance}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await flowSDK.nft.send.transferSignedTransaction({
    chain: Currency.FLOW,
    to: secondAccount,
    tokenId,
    account,
    privateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurned = (await flowSDK.nft.send.burnSignedTransaction({
    chain: Currency.FLOW,
    tokenId,
    contractAddress,
    account: secondAccount,
    privateKey: secondPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)
}
