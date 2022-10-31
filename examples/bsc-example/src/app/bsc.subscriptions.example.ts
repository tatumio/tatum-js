import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscSubscriptionsExample() {
  const { xpub } = await bscSDK.wallet.generateWallet()
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const subscription = await bscSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address,
      chain: 'BSC',
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription id: ${subscription.id}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await bscSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await bscSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await bscSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await bscSDK.subscriptions.deleteSubscription(subscription.id as string)
}
