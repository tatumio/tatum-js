import { TatumXlmSDK } from '@tatumio/xlm'
import { TransactionHash } from '@tatumio/api-client'
import { isValueSet, REPLACE } from './xlm.utils'

export async function xlmTxExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const fromAddress = REPLACE
  const fromSecret = REPLACE

  if (isValueSet(fromAddress)) {
    // Generate a Stellar account.
    // The account address and secret will be generated.
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

  // Generate another Stellar account.
  // This is the recipient account where you are going to transfer funds to.
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
  const { address: recipientAddress } = xlmSDK.wallet.wallet()

  // Get information about the account.
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetAccountInfo
  const accountDetails = await xlmSDK.blockchain.getAccountInfo(fromAddress)

  // We need to divide the balance by 1_000_000, because the balance is in stroops.
  console.log(
    `Account ${fromAddress} has ${
      Number(accountDetails.balances ? accountDetails.balances[0].balance : 0) / 1000000
    } XLM.`,
  )

  // Send some amount of XLM from your account to the recipient account.
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
