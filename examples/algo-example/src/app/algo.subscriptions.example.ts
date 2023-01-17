import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency } from '@tatumio/api-client'

export async function algoSubscriptionsExample() {
  const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate an Algorand account.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address } = algoSDK.wallet.generateWallet()

  // Generate a virtual account for ALGO.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await algoSDK.ledger.account.create({
    currency: Currency.ALGO,
  })
  console.log(JSON.stringify(virtualAccount))

  // Assign the blockchain address of the account that you created earlier to the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const depositAddress = await algoSDK.virtualAccount.depositAddress.assign(virtualAccount.id, address)
  console.log(`Deposit address is ${depositAddress.address}`)

  // Create a subscription for the virtual account.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await algoSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: virtualAccount.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Created subscription ID ${id}`)

  // List all active subscriptions.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await algoSDK.subscriptions.getSubscriptions(10)
  console.log(`There is ${subscriptions.length} active subscriptions`)

  // Fund the assigned address with ALGO using https://bank.testnet.algorand.network/.

  // Enable HMAC for the fired notifications.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await algoSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  console.log(`Enabled HMAC webhook digest`)

  // Disable HMAC.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await algoSDK.subscriptions.disableWebHookHmac()
  console.log(`Disabled HMAC webhook digest`)

  // Cancel an existing subscription.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await algoSDK.subscriptions.deleteSubscription(id)
  console.log(`Existing subscription was canceled`)
}
