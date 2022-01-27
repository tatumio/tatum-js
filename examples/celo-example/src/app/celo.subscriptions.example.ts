import { CreateSubscriptionIncoming } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoSubscriptionsExample() {
  const id = await celoSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: CreateSubscriptionIncoming.type.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION,
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await celoSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await celoSDK.subscriptions.disableWebHookHmac()
  await celoSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await celoSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await celoSDK.subscriptions.getSubscriptions(10)
}
