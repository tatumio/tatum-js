import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcSubscriptionsExample() {
  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const id = await xdcSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'dashboard.tatum.io/webhook-handler',
    },
  })

  // Cancel an existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await xdcSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')

  // Disable Webhook HMAC
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await xdcSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
  // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
  await xdcSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Obtain report for subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptionReport
  const subscriptionReport = await xdcSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  console.log(`Subscription report ${subscriptionReport}`)

  // List all active subscriptions
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await xdcSDK.subscriptions.getSubscriptions(10)
  console.log(`Subscriptions ${subscriptions}`)
}