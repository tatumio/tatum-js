import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscSubscriptionsExample() {
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const subscriptionId = (await bscSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })) as string

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await bscSDK.subscriptions.getSubscriptions(10)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptionReport
  const subscriptionReport = await bscSDK.subscriptions.getSubscriptionReport(subscriptionId)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await bscSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await bscSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await bscSDK.subscriptions.deleteSubscription(subscriptionId)
}
