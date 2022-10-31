import { TatumBscSDK } from '@tatumio/bsc'

export async function bscBalanceExample() {
  const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await bscSDK.wallet.generateWallet()
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetBalance
  const { balance } = await bscSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} BNB.`)
}
