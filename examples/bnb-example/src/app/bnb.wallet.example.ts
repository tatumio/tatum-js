import { TatumBnbSDK } from '@tatumio/bnb'

const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bnbWalletExample() {
  // Generate BNB wallet
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGenerateWallet
  const { address, privateKey } = await bnbSDK.wallet.generateWallet(true)

  console.log(`My public address is ${address}, with private key ${privateKey}.`)

  // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/

  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGetAccount
  const accountDetails = await bnbSDK.blockchain.getAccount(address)
  console.log(`My account has ${JSON.stringify(accountDetails.balances)} BNB.`)
}
