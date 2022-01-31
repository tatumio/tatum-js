import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { CreateSubscriptionIncoming } from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ledgerSubscriptionsExample() {
  const subscription = await tatumSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '1',
      url: 'http://example.com',
    },
  })

  const report = await tatumSDK.subscriptions.getSubscriptionReport(subscription.id!)

  await tatumSDK.subscriptions.enableWebHookHmac({
    hmacSecret: 'HMAC SECRET',
  })

  await tatumSDK.subscriptions.disableWebHookHmac()

  await tatumSDK.subscriptions.deleteSubscription(subscription.id!)
}
