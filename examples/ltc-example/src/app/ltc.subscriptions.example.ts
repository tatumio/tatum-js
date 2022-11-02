import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function ltcSubscriptionsExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Create subscription notification for receiving webhooks on all incoming/outgoing transactions on the address.
  // FREE plans are limited to 10 addresses monitoring per api key, this call will likely fail with the default api key.
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  try {
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
  } catch (e) {
    console.log(`Subscription: ${e.message}`)
  }

  // See a list of all fired webhooks
  // You can find more details in https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getAllWebhooks
  const webhooks = await ltcSDK.subscriptions.getAllWebhooks(50)
  console.log(`Webhooks: ${JSON.stringify(webhooks)}`)
}
