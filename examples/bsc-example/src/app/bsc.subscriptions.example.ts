import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

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
