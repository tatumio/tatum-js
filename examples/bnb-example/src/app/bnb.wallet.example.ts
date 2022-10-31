import { TatumBnbSDK } from '@tatumio/bnb'

export async function bnbWalletExample() {
  const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const wallet = bnbSDK.wallet

  const { address, privateKey } = await wallet().generateWallet(true)
  console.log(` My public address is ${address}, with private key ${privateKey}.`)

  // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/
  const accountDetails = await bnbSDK.blockchain.getAccount(address)
  const balances = JSON.stringify(accountDetails.balances)
  console.log(`My account has ${balances} BNB.`)
}
