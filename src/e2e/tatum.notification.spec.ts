import { TatumSdk } from '../service/tatum/tatum'
import { Chain } from '../service/tatum/tatum.dto'
import { AddressTransactionNotification } from '../service/notification/notification.dto'
import { TestConst } from './e2e.constant'

describe('notification',  () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      testnet: true,
    })
  })

  it('createSubscription', async () => {
      const { id, url, chain, address } = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.ethereum,
        address: TestConst.ETH_ADDRESS,
      })
      expect(id).toBeDefined()
      expect(chain).toBeDefined()
      expect(address).toBeDefined()
      expect(url).toBeDefined()
      await tatum.notification.unsubscribe(id)
  })

  it('deleteSubscription', async () => {
    const { id } = await tatum.notification.subscribe.addressTransaction({
      url: 'https://tatum.io',
      chain: Chain.ethereum,
      address: TestConst.ETH_ADDRESS,
    })
    await tatum.notification.unsubscribe(id)
    const { addressTransactions } = await tatum.notification.getAll()
    const subscriptions = addressTransactions.find(s => s.chain === Chain.ethereum && s.address.toLowerCase() === TestConst.ETH_ADDRESS.toLowerCase()) as AddressTransactionNotification
    expect(subscriptions).toEqual(undefined)
  })

  it('getAll', async () => {
    const { addressTransactions } = await tatum.notification.getAll()
    expect(addressTransactions[0].id).toBeDefined()
    expect(addressTransactions[0].chain).toBeDefined()
    expect(addressTransactions[0].address).toBeDefined()
    expect(addressTransactions[0].url).toBeDefined()
    expect(addressTransactions[0].type).toBeDefined()
    expect(addressTransactions.length).toBeGreaterThan(0)
  })
})
