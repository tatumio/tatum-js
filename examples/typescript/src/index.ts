import { subscribe } from './notification/subscribe'
import { getAllSubscriptions } from './notification/subscriptions'
import { getAllWebhooks } from './notification/webhooks'
import { unsubscribe } from './notification/unsubscribe'

const run = async () => {
  await subscribe()
  await getAllSubscriptions()
  await getAllWebhooks()
  await unsubscribe()
}

run()
