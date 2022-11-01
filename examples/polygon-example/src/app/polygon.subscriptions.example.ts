import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function polygonSubscriptionsExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { xpub } = await polygonSDK.wallet.generateWallet()
  const address = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Address for wallet is ${address} and extended public key is ${xpub}.`)

  // Create a subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await polygonSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address,
      chain: Currency.MATIC,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription id: ${id}`)

  // List all active subscriptions
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await polygonSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', JSON.stringify(subscriptions))

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // Obtain report for subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptionReport
  const subscriptionReport = await polygonSDK.subscriptions.getSubscriptionReport(id as string)
  console.log(`There is ${subscriptionReport.length} records in subscription ID ${id}`)

  // Enable HMAC webhook digest
  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await polygonSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Disable HMAC webhook digest
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await polygonSDK.subscriptions.disableWebHookHmac()

  // Cancel existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await polygonSDK.subscriptions.deleteSubscription(id as string)
}
