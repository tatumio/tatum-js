import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoMultiTokenExample() {
  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // Mint Multi token on your own smart contract
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/MintMultiToken
  const minted = (await algoSDK.multiToken.send.createFractionalNFTSignedTransaction({
    chain: Currency.ALGO,
    to,
    tokenId: '1001',
    contractAddress: '1001',
    amount: '1',
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Minted with transaction ID: ${minted.txId}`)

  // Transfer Multi token from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/TransferMultiToken
  const transferred = (await algoSDK.multiToken.send.transferFractionalNFTSignedTransaction({
    chain: Currency.ALGO,
    to,
    tokenId: '1001',
    contractAddress: '1001',
    amount: '1',
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Transferred with transaction hash: ${transferred.txId}`)

  // Burn one Multi token Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/BurnMultiToken
  const burned = (await algoSDK.multiToken.send.burnFractionalNFTSignedTransaction({
    chain: Currency.ALGO,
    account: to,
    tokenId: '1001',
    contractAddress: '1001',
    amount: '1',
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Burned with transaction ID: ${burned.txId}`)
}
