import { SubscriptionType } from '@tatumio/tatum-core'
import { createNewSubscription } from './subscription'

describe('Subscription tests', () => {
  it('should test create of subscription', async () => {
    const subscription = await createNewSubscription({
      type: SubscriptionType.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION,
      attr: {
        id: '60769e61dc5d2426a3091269',
        url: 'https://google.com',
      },
    })
    expect(subscription).not.toBeNull()
  })
})
