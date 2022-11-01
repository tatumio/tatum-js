import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcSubscriptionsExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Create subscription notification for receiving webhooks on all incoming/outgoing transactions on the address.
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await ltcSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address: '2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb',
      chain: 'LTC',
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription ID: ${id}, could be deleted later using deleteSubscription(id)`)
  await ltcSDK.subscriptions.deleteSubscription(id)

  // See a list of all fired webhooks
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getAllWebhooks
  console.log(await ltcSDK.subscriptions.getAllWebhooks(50))
}
