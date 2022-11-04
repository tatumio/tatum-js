import { TatumBnbSDK } from '@tatumio/bnb'
import { Currency } from '@tatumio/api-client'

export async function bnbTxExample() {
  const bnbSDK = TatumBnbSDK({ apiKey: 'PLACE-YOUR-API-KEY-HERE' })
  const wallet = bnbSDK.wallet

  const { address, privateKey } = await wallet().generateWallet(true)
  console.log(`My public address is ${address}, with private key ${privateKey}.`)

  const { address: toAddress } = await wallet().generateWallet(true)
  // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/

  const accountDetails = await bnbSDK.blockchain.getAccount(address)
  console.log(`My account has balances: ${JSON.stringify(accountDetails.balances)}.`)

  const txId = await bnbSDK.transaction.sendTransaction(
    {
      amount: '0.01',
      to: toAddress,
      fromPrivateKey: privateKey,
      currency: Currency.BNB,
    },
    { testnet: true },
  )

  console.log(`Transaction with ID ${JSON.stringify(txId)} was sent.`)
}
