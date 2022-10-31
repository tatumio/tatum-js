import { TatumBnbSDK } from '@tatumio/bnb'

export async function bnbTxExample() {
  const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const wallet = bnbSDK.wallet

  const { address, privateKey } = await wallet().generateWallet(true)
  const { address: to } = await wallet().generateWallet(true)

  console.log(` My public address is ${address}, with private key ${privateKey}.`)

  // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/

  const accountDetails = await bnbSDK.blockchain.getAccount(address)
  console.log(`My account has ${accountDetails.balances} BNB.`)

  const txId = await bnbSDK.transaction.sendTransaction(
    {
      senderAccountId: address,
      amount: '0.01',
      address: to,
      fromPrivateKey: privateKey,
    },
    { testnet: true },
  )

  console.log(`Transaction with ID ${txId} was sent.`)
}
