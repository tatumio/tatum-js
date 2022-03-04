import { TatumSolanaSDK } from '@tatumio/solana'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaSubscriptionsExample() {
  const id = await solanaSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: '5e6be8e9e6aa436299950c41',
      url: 'https://webhook.tatum.io/account',
    },
  })

  await solanaSDK.subscriptions.deleteSubscription('5e68c66581f2ee32bc354087')
  await solanaSDK.subscriptions.disableWebHookHmac()
  await solanaSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const subscriptionReport = await solanaSDK.subscriptions.getSubscriptionReport('5e68c66581f2ee32bc354087')
  const subscriptions = await solanaSDK.subscriptions.getSubscriptions(10)
}
