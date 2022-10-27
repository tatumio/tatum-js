import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// @TODO: remove ALGO from openApi - MINT ERC20 section

export async function algoErc20Example() {
  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // deploy erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const mintedErc20 = (await algoSDK.erc20.send.createFTSignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address,
    supply: '10000000',
    fromPrivateKey,
    digits: 18,
    totalCap: '10000000',
    url: 'google.com',
  })) as TransactionHash
  console.log(`Deployed erc20 token with transaction ID ${mintedErc20.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/ALGOGetTransaction
  const { contractAddress } = await algoSDK.nft.getNFTContractAddress(Currency.ALGO, mintedErc20.txId)

  // send erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const transferredErc20 = (await algoSDK.erc20.send.transferFTSignedTransaction({
    to,
    amount: '1',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Erc20 transaction with transaction ID ${transferredErc20.txId} was sent.`)

  // burn erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const burnedErc20 = (await algoSDK.erc20.send.burnFTSignedTransaction({
    to,
    amount: '1',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Burned erc20 token/s with transaction ID ${burnedErc20.txId}`)
}
