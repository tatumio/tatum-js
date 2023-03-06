import { TatumSdk } from '../service/tatum/tatum'
import { Chain, Network } from '../service/tatum/tatum.dto'
import { AddressEventNotification } from '../service/notification/notification.dto'
import { TestConst } from './e2e.constant'
import { e2eUtil } from './e2e.util'
import { Status } from '../util'

describe('notification', () => {
  let tatum: TatumSdk

  beforeAll(async () => {
    tatum = await TatumSdk.init({ network: Network.Testnet })
  })

  describe('createSubscription', () => {

    describe('IP auth', () => {
      it.each(Object.values(Chain))('OK %s', async (chain: Chain) => {
        await e2eUtil.subscriptions.testCreateSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain])
      })
    })

    it('NOK - existing subscription ', async () => {
      const { status, error } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        chain: Chain.Ethereum,
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })

      expect(status).toEqual(Status.ERROR)
      expect(error?.message[0]).toMatch(/^Subscription for type ADDRESS_EVENT on the address id 0xbaf6dc2e647aeb6f510f9e318856a1bcd66c5e19 and currency ETH already exists./)
      expect(error?.code).toEqual('subscription.exists.on.address-and-currency')
    })

    it('NOK - invalid address', async () => {
      const { status, error } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        chain: Chain.Ethereum,
        address: TestConst.INVALID_ETH_ADDRESS,
      })
      expect(status).toEqual(Status.ERROR)
      expect(error?.message).toEqual(['address must be a valid ETH address. Address must start with 0x and must contain 40 hexadecimal characters after and have the correct checksum. '])
      expect(error?.code).toEqual('validation.failed')
    })


  })

  describe('deleteSubscription', () => {
    it('OK', async () => {
      const address = TestConst.ADDRESSES.TESTNET[Chain.Ethereum]
      const { data: subscribeData } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        chain: Chain.Ethereum,
        address,
      })
      const { id } = subscribeData
      await tatum.notification.unsubscribe(id)
      const { data } = await tatum.notification.getAll()
      const subscriptions = data.find(s => s.chain === Chain.Ethereum && s.address.toLowerCase() === address.toLowerCase()) as AddressEventNotification
      expect(subscriptions).toEqual(undefined)
    })

    it('NOK - invalid subscription', async () => {
      const { data, status, error } = await tatum.notification.unsubscribe('invalid-subscription-id')
      expect(data).toEqual(null)
      expect(status).toEqual(Status.ERROR)
      expect((error?.message as object[])[0]).toEqual('id should be valid id and 24 characters long, e.g. 6398ded68bfa23a9709b1b17')
    })
  })

  it('getAll', async () => {
    const { data, error } = await tatum.notification.getAll()
    console.log(error)
    expect(data[0].id).toBeDefined()
    expect(data[0].chain).toBeDefined()
    expect(data[0].address).toBeDefined()
    expect(data[0].url).toBeDefined()
    expect(data[0].type).toBeDefined()
    expect(data.length).toBeGreaterThan(0)
  })

  it('getAllExecutedWebhooks', async () => {
    const { data } = await tatum.notification.getAllExecutedWebhooks()
    expect(data[0].type).toBeDefined()
    expect(data[0].id).toBeDefined()
    expect(data[0].subscriptionId).toBeDefined()
    expect(data[0].url).toBeDefined()
    expect(data[0].data).toBeDefined()
    expect(data[0].timestamp).toBeDefined()
    expect(data[0].failed).toBeDefined()
    expect(data[0].response).toBeDefined()
  })
})
