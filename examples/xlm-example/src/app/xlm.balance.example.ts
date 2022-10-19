import { TatumXlmSDK } from '@tatumio/xlm'

export async function xlmBalanceExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { address, secret } = xlmSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  // FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetAccountInfo
  const accountDetails = await xlmSDK.blockchain.getAccountInfo(address)
  // We need to divide the balance by 1_000_000, because the balance is in stroops.
  console.log(
    `My account has ${
      Number(accountDetails.balances ? accountDetails.balances[0].balance : 0) / 1000000
    } XLM.`,
  )
}
