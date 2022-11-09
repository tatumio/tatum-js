import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function dogeSubscriptionsExample() {
  const options = { testnet: true }
  const { xpub } = await dogeSDK.wallet.generateWallet(undefined, options)
  const address = dogeSDK.wallet.generateAddressFromXPub(xpub, 0, options)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const subscription = await dogeSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address,
      chain: 'DOGE',
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription id: ${subscription.id}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await dogeSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await dogeSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await dogeSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await dogeSDK.subscriptions.deleteSubscription(subscription.id)
}
