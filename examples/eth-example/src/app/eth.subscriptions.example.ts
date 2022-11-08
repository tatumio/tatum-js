import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethSubscriptionsExample() {
  const { xpub } = await ethSDK.wallet.generateWallet(undefined, { testnet: true })
  const address = ethSDK.wallet.generateAddressFromXPub(xpub, 0)

  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const id = await ethSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address,
      chain: 'ETH',
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await ethSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await ethSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Disable Webhook HMAC
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await ethSDK.subscriptions.disableWebHookHmac()

  // Cancel an existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await ethSDK.subscriptions.deleteSubscription(id.id as string)
}
