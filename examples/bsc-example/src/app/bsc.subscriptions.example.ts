import { CreateSubscriptionIncoming } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscSubscriptionsExample() {
  const id = await bscSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await bscSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await bscSDK.subscriptions.disableWebHookHmac()
  await bscSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await bscSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await bscSDK.subscriptions.getSubscriptions(10)
}
