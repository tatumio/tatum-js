import { subscribe } from './notification/subscribe'
import { getAllSubscriptions } from './notification/subscriptions'
import { getAllWebhooks } from './notification/webhooks'
import { unsubscribe } from './notification/unsubscribe'
import { rpc } from './rpc/ethereum'

const run = async () => {
  // Notification
  await subscribe()
  await getAllSubscriptions()
  await getAllWebhooks()
  await unsubscribe()

  // RPC
  await rpc()
}

run()
