import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { algoAddress, algoSecret, isTestnet, sdkArguments } from '../index'

export async function algoAsaExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  // const { address, secret } = algoSDK.wallet.generateWallet()
  const address = algoAddress
  const secret = algoSecret
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address
  console.log(`Public address is ${address} and secret: ${secret}.`)

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // create ASA (erc20 fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const mintedAsa = (await algoSDK.token.fungible.send.createFTSignedTransaction(
    {
      symbol: 'ERC_SYMBOL',
      name: 'mytx',
      address,
      supply: '10000000',
      fromPrivateKey,
      digits: 18,
      totalCap: '10000000',
      url: 'https://google.com',
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Created ASA token with transaction ID ${mintedAsa.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/ALGOGetTransaction
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, mintedAsa.txId)
  console.log(`Created ASA token with contract address: ${contractAddress}`)

  // send ASA (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const transferredAsa = (await algoSDK.token.fungible.send.transferFTSignedTransaction(
    {
      to,
      amount: '1',
      contractAddress,
      fromPrivateKey,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`ASA transaction with transaction ID ${transferredAsa.txId} was sent.`)

  // burn ASA (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const burnedAsa = (await algoSDK.token.fungible.send.burnFTSignedTransaction(
    {
      amount: '1',
      contractAddress,
      fromPrivateKey,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Burned ASA token/s with transaction ID ${burnedAsa.txId}`)
}
