import { TatumXlmSDK } from '@tatumio/xlm'
import { TransactionHash } from '@tatumio/api-client'
import { isAddressSet, REPLACE } from './xlm.balance.example'

export async function xlmTxExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const fromAddress = REPLACE
  const fromSecret = REPLACE

  if (isAddressSet(fromAddress)) {
    // Generate XLM address and secret
    // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
    const { address, secret } = xlmSDK.wallet.wallet()
    console.log(`=================`)
    console.log(`Generated address: ${address}`)
    console.log(`Generated secret: ${secret}`)
    console.log(`>> Please fund address from https://laboratory.stellar.org/#account-creator?network=testnet`)
    console.log(`>> Set funded address to const 'fromAddress'`)
    console.log(`>> Set secret of address to const 'fromSecret' and rerun example`)
    console.log(`=================`)
    return
  }

  // Generate recipient address
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
  const { address: recipientAddress } = xlmSDK.wallet.wallet()

  // Get information of XLM account address
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetAccountInfo
  const accountDetails = await xlmSDK.blockchain.getAccountInfo(fromAddress)

  // We need to divide the balance by 1_000_000, because the balance is in stroops.
  console.log(
    `Account ${fromAddress} has ${
      Number(accountDetails.balances ? accountDetails.balances[0].balance : 0) / 1000000
    } XLM.`,
  )

  // Send transaction
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
  const { txId } = (await xlmSDK.transaction.sendTransaction(
    {
      fromAccount: fromAddress,
      fromSecret: fromSecret,
      amount: '1',
      to: recipientAddress,
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
