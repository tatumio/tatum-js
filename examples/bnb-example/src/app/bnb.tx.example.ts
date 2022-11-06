import { TatumBnbSDK } from '@tatumio/bnb'
import { Currency } from '@tatumio/api-client'

const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bnbTxExample() {
  // Generate BNB wallet
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGenerateWallet
  const { address, privateKey } = await bnbSDK.wallet.generateWallet(true)
  console.log(`My public address is ${address}, with private key ${privateKey}.`)

  const { address: toAddress } = await bnbSDK.wallet.generateWallet(true)

  // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/

  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGetAccount
  const accountDetails = await bnbSDK.blockchain.getAccount(address)
  console.log(`My account has balances: ${JSON.stringify(accountDetails.balances)}.`)

  // Send BNB transaction
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbBlockchainTransfer
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
