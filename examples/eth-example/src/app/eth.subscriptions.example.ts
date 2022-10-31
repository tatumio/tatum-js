import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethSubscriptionsExample() {
  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const id = await ethSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'dashboard.tatum.io/webhook-handler',
    },
  })

  // Disable Webhook HMAC
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await ethSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
  // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
  await ethSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Cancel an existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await ethSDK.subscriptions.deleteSubscription(id.id as string)

  const subscriptions = await ethSDK.subscriptions.getSubscriptions(10)
}
