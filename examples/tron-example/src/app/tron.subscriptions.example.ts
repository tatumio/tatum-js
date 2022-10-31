import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronSubscriptionsExample() {
  const { xpub } = await tronSDK.wallet.generateWallet()
  const address = tronSDK.wallet.generateAddressFromXPub(xpub, 0)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const subscription = await tronSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address,
      url: 'https://dashboard.tatum.io/webhook-handler',
      chain: 'TRON',
    },
  })

  console.log('Subscription created: ', subscription)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await tronSDK.subscriptions.getSubscriptions(10)

  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await tronSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await tronSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await tronSDK.subscriptions.deleteSubscription(subscription.id as string)
}
