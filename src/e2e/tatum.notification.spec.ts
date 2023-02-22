import { TatumSdk } from '../service/tatum/tatum'
import { Chain, Network } from '../service/tatum/tatum.dto'
import { AddressTransactionNotification } from '../service/notification/notification.dto'
import { TestConst } from './e2e.constant'
import { e2eUtil } from './e2e.util'
import { Status } from '../util'
jest.useFakeTimers()
jest.spyOn(global, 'setInterval')

describe('notification', () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.MAINNET_API_KEY,
      network: Network.Mainnet,
      debug: true
    })
  })

  describe('createSubscription', () => {
    it.each(Object.values(Chain))('OK - %s', async (chain: Chain) => {
      await e2eUtil.subscriptions.testCreateSubscription(tatum, chain, TestConst.TEST_ADDRESSES[chain])
    })

    it('NOK - existing subscription ', async () => {
      const { status, error } = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.Ethereum,
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })

      expect(status).toEqual(Status.ERROR)
      expect(error?.message[0]).toEqual('Subscription for type ADDRESS_TRANSACTION on the address id 0xbaf6dc2e647aeb6f510f9e318856a1bcd66c5e19 and currency ETH already exists.')
      expect(error?.code).toEqual('subscription.exists.on.address-and-currency')
    })

    it('NOK - invalid address', async () => {
      const { status, error } = await tatum.notification.subscribe.addressTransaction({
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
      const address = TestConst.TEST_ADDRESSES[Chain.Ethereum]
      const { data: subscribeData } = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.Ethereum,
        address,
      })
      const { id } = subscribeData
      await tatum.notification.unsubscribe(id)
      const { data } = await tatum.notification.getAll()
      const subscriptions = data.find(s => s.chain === Chain.Ethereum && s.address.toLowerCase() === address.toLowerCase()) as AddressTransactionNotification
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
    const { data } = await tatum.notification.getAll()
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

  describe('Listen', () => {
    it('OK', async () => {


      const fn = {
        testingFn: () => console.log('calling inner function'),
      }

      jest.spyOn(fn, 'testingFn')
      const listener = await tatum.notification.listen({
        address: '0x258e0a771E2063508DE155ABd6A9062c7d13aBdB',
        chain: Chain.Ethereum,
        interval: 2000,
        handleWebhook: fn.testingFn,
      })
      console.log(listener)

      jest.useFakeTimers().setTimeout(1000).retryTimes(5)
      // jest.advanceTimersByTime(2000);
      jest.runOnlyPendingTimers()

      // jest.useFakeTimers().setTimeout(1000).retryTimes(8).runAllTimers()
      // expect(setInterval).toHaveBeenCalledTimes(1)
      // expect(fn.testingFn).toHaveBeenCalledTimes(1)
      await tatum.notification.unsubscribe(listener.data.subscriptionId)
    })
  })

})
