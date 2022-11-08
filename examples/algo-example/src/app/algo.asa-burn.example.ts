import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { isTestnet, sdkArguments } from '../index'

export async function algoAsaBurnExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // create ASA (erc20 fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const mintedAsa = (await algoSDK.token.fungible.send.createFTSignedTransaction(
    {
      symbol: 'ASA_ELGO',
      name: 'ALGO_ASA_TOKEN',
      address,
      supply: '10',
      fromPrivateKey,
      digits: 1,
      totalCap: '10',
      url: 'https://google.com',
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Created ASA token with transaction ID ${mintedAsa.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/ALGOGetTransaction
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, mintedAsa.txId)
  console.log(`Created ASA token with contract address: ${contractAddress}`)

  // burn ASA (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const burnedAsa = (await algoSDK.token.fungible.send.burnFTSignedTransaction(
    {
      contractAddress,
      fromPrivateKey,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Burned ASA token/s with transaction ID ${burnedAsa.txId}`)
}
