import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronSubscriptionsExample() {
  const id = await tronSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await tronSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await tronSDK.subscriptions.disableWebHookHmac()
  await tronSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await tronSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await tronSDK.subscriptions.getSubscriptions(10)
}
