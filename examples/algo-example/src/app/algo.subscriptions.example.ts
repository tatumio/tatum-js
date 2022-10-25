/**
 * NOT SUPPORTED YET
 */

import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoSubscriptionsExample() {
  // Create a subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await algoSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })
  console.log(`Created subscription ID ${id}`)

  // List all active subscriptions
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await algoSDK.subscriptions.getSubscriptions(10)
  console.log(`There is ${subscriptions.length} active subscriptions`)

  // Obtain report for subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptionReport
  const subscriptionReport = await algoSDK.subscriptions.getSubscriptionReport(id)
  console.log(`There is ${subscriptionReport.length} records in subscription ID ${id}`)

  // Enable HMAC webhook digest
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await algoSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  console.log(`Enabled HMAC webhook digest`)

  // Disable HMAC webhook digest
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await algoSDK.subscriptions.disableWebHookHmac()
  console.log(`Disabled HMAC webhook digest`)

  // Cancel existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await algoSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  console.log(`Existing subscription was canceled`)
}
