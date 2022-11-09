import { Currency } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneSubscriptionsExample() {
  const { xpub } = await oneSDK.wallet.generateWallet(undefined, { testnet: true })

  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const account = await oneSDK.ledger.account.create({
    currency: Currency.ONE,
    xpub: xpub,
    customer: {
      externalId: 'YOUR_EXTERNAL_ID',
    },
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const subscription = await oneSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      // your account ID
      id: account.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription id: ${subscription.id}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await oneSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await oneSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await oneSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await oneSDK.subscriptions.deleteSubscription(subscription.id as string)
}
