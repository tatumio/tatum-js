import { TatumTronSDK } from '@tatumio/tron'

export async function tronBalanceExample() {
  const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await tronSDK.wallet.generateWallet()
  const address = tronSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH TRX FROM https://twitter.com/TronTest2

  // https://apidoc.tatum.io/tag/Tron#operation/TronGetAccount
  const { balance } = await tronSDK.blockchain.getAccount(address)

  console.log(`My account has ${balance} TRX.`)
}
