import { TatumTronSDK } from '@tatumio/tron'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronBalanceExample() {
  // In order to retrieve balance first fund your address here: https://twitter.com/TronTest2
  // Funding your address will activate it and make it usable
  const address = '<PUT YOUR ADDRESS HERE>'

  console.log(`My address is ${address}.`)

  // https://apidoc.tatum.io/tag/Tron#operation/TronGetAccount
  const { balance } = await tronSdk.blockchain.getAccount(address)

  console.log(`My account has ${balance} TRX.`)
}
