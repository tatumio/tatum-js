import { TatumOneSDK } from '@tatumio/one'

export async function oneBalanceExample() {
  const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await oneSDK.wallet.generateWallet()
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH ONE FROM https://faucet.pops.one/

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetBalance
  const { balance } = await oneSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} ONE.`)
}
