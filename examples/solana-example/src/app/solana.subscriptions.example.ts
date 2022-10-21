import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * Create subscription notification for receiving webhooks on all incoming/outgoing transactions on the address.
 * https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
 */
export async function solanaSubscriptionsExample() {
  const { id } = await solanaSDK.subscriptions.createSubscription({
    type: 'ADDRESS_TRANSACTION',
    attr: {
      address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
      chain: 'SOL',
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })
  console.log(`Subscription ID: ${id}, could be deleted later using deleteSubscription(id)`)
  await solanaSDK.subscriptions.deleteSubscription(id)

  // To see list of all fired webhooks
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getAllWebhooks
  console.log(await solanaSDK.subscriptions.getAllWebhooks(50))
}
