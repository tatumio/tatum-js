import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnSubscriptionsExample() {
  const id = await klaytnSDK.subscriptions.createSubscription({
    // TODO openapi bug
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await klaytnSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await klaytnSDK.subscriptions.disableWebHookHmac()
  await klaytnSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await klaytnSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await klaytnSDK.subscriptions.getSubscriptions(10)
}
