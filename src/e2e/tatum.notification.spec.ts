import { TatumSdk } from '../service/tatum/tatum'
import { Chain, Network } from '../service/tatum/tatum.dto'
import { AddressTransactionNotification } from '../service/notification/notification.dto'
import { TestConst } from './e2e.constant'
import { Status } from '../dto/shared.dto'

describe('notification',  () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      network: Network.Testnet,
    })
  })

  describe('createSubscription',() => {
    it('OK', async () => {
      const { data } = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.ethereum,
        address: TestConst.ETH_ADDRESS,
      })
      const { id, url, chain, address } = data
      expect(id).toBeDefined()
      expect(chain).toBeDefined()
      expect(address).toBeDefined()
      expect(url).toBeDefined()
      await tatum.notification.unsubscribe(id)
    })

    it('NOK', async () => {
      const { status, error } = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.ethereum,
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })
      expect(status).toEqual(Status.ERROR)
      expect(error).toEqual('Subscription for type ADDRESS_TRANSACTION on the address id 0xbaf6dc2e647aeb6f510f9e318856a1bcd66c5e19 and currency ETH already exists.')
    })
  })

  it('deleteSubscription', async () => {
    const { data: subscribeData } = await tatum.notification.subscribe.addressTransaction({
      url: 'https://tatum.io',
      chain: Chain.ethereum,
      address: TestConst.ETH_ADDRESS,
    })
    const { id } = subscribeData
    await tatum.notification.unsubscribe(id)
    const { data } = await tatum.notification.getAll()
    const subscriptions = data.addressTransactions.find(s => s.chain === Chain.ethereum && s.address.toLowerCase() === TestConst.ETH_ADDRESS.toLowerCase()) as AddressTransactionNotification
    expect(subscriptions).toEqual(undefined)
  })

  it('getAll', async () => {
    const { data } = await tatum.notification.getAll()
    expect(data.addressTransactions[0].id).toBeDefined()
    expect(data.addressTransactions[0].chain).toBeDefined()
    expect(data.addressTransactions[0].address).toBeDefined()
    expect(data.addressTransactions[0].url).toBeDefined()
    expect(data.addressTransactions[0].type).toBeDefined()
    expect(data.addressTransactions.length).toBeGreaterThan(0)
  })
})
