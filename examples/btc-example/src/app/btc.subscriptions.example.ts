import { TatumBtcSDK } from '@tatumio/btc'

export async function btcSubscriptionsExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Create subscription notification for receiving webhooks on all incoming/outgoing transactions on the address.
  // FREE plans are limited to 10 addresses monitoring per api key, this call will likely fail with the default api key.
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  try {
    const { id } = await btcSDK.subscriptions.createSubscription({
      type: 'ADDRESS_TRANSACTION',
      attr: {
        address: '2NBf6ru67df793MWKj3sxUJiYVsQuycHN5T',
        chain: 'BTC',
        url: 'https://dashboard.tatum.io/webhook-handler',
      },
    })
    console.log(`Subscription ID: ${id}, could be deleted later using deleteSubscription(id)`)
    await btcSDK.subscriptions.deleteSubscription(id)
  } catch (e) {
    console.log(`Subscription: ${e.message}`)
  }

  // See a list of all fired webhooks
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getAllWebhooks
  const webhooks = await btcSDK.subscriptions.getAllWebhooks(50)
  console.log(`Webhooks: ${JSON.stringify(webhooks)}`)
}
