import { CreateSubscriptionIncoming } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethSubscriptionsExample() {
  const id = await ethSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: CreateSubscriptionIncoming.type.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION,
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await ethSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await ethSDK.subscriptions.disableWebHookHmac()
  await ethSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await ethSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await ethSDK.subscriptions.getSubscriptions(10)
}
