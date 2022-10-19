import { TatumXlmSDK } from '@tatumio/xlm'
import { TransactionHash } from '@tatumio/api-client'

export async function xlmTxExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { address, secret } = xlmSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  const { address: to } = xlmSDK.wallet.wallet()
  // FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

  const accountDetails = await xlmSDK.blockchain.getAccountInfo(address)
  console.log(
    `My account has ${
      accountDetails.balances ? Number(accountDetails.balances[0].balance) / 1000000 : 0
    } XLM.`,
  )

  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
  const { txId } = (await xlmSDK.transaction.sendTransaction(
    {
      fromAccount: address,
      fromSecret: secret,
      amount: '1',
      to: to,
      initialize: true,
    },
    { testnet: true },
  )) as TransactionHash
  console.log(`Transaction with ID ${txId} was sent.`)
}

export async function xlmTrustlineTxExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { address, secret } = xlmSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  const { address: to } = xlmSDK.wallet.wallet()
  // FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

  const accountDetails = await xlmSDK.blockchain.getAccountInfo(address)
  console.log(
    `My account has ${
      accountDetails.balances ? Number(accountDetails.balances[0].balance) / 1000000 : 0
    } XLM.`,
  )

  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTrustLineBlockchain
  const { txId } = (await xlmSDK.transaction.sendTrustlineTransaction(
    {
      fromAccount: address,
      fromSecret: secret,
      limit: '100',
      issuerAccount: address,
      token: 'MY_TOKEN',
    },
    { testnet: true },
  )) as TransactionHash
  console.log(`Transaction with ID ${txId} was sent.`)
}
