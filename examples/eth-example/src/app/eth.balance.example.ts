import { TatumEthSDK } from '@tatumio/eth'

export async function ethBalanceExample() {
  const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateWallet
  const { xpub } = await ethSDK.wallet.generateWallet(undefined, { testnet: true })

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const address = ethSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH ETH FROM https://faucet.sepolia.dev/

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetBalance
  const { balance } = await ethSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} ETH.`)
}
