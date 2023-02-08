import { TatumSdk } from '../service/tatum/tatum'
import { TestConst } from './e2e.constant'
import { Chain } from '../service/tatum/tatum.dto'

describe('notification',  () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: TestConst.TESTNET_API_KEY,
      testnet: true,
    })
  })

  it('createSubscription', async () => {
    const response = await tatum.notification.subscribe.addressTransaction({
      url: 'https://tatum.io',
      chain: Chain.ETH,
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
    })
    expect(response.id).toBeDefined()
  })

  it('deleteSubscription', async () => {
    const subscriptions = await tatum.notification.getSubscriptions()
    const subscription = subscriptions[0]
    await tatum.notification.deleteSubscription(subscription.id)
  })

  it('getSubscriptions', async () => {
    const subscriptions = await tatum.notification.getSubscriptions()
    expect(subscriptions.length).toBeGreaterThan(0)
  })
})
