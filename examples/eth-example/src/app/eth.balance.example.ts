import { TatumEthSDK } from '@tatumio/eth'
import Web3 from 'web3'

export async function ethBalanceExample() {
  const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await ethSDK.wallet.generateWallet()
  const address = ethSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH ETH FROM https://faucet.sepolia.dev/

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetBalance
  const { balance } = await ethSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${Web3.utils.fromWei(balance as string)} ETH.`)
}
