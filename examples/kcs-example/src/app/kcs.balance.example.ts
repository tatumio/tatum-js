import { TatumKcsSDK } from '@tatumio/kcs'

export async function kcsBalanceExample() {
  const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await kcsSDK.wallet.generateWallet()

  const address = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH KCS FROM https://faucet-testnet.kcc.network

  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetBalance
  const { balance } = await kcsSDK.blockchain.getBlockchainAccountBalance(address)
  if (balance) {
    console.log(`Balance:`, balance)
  }
}
