import { TatumSdk } from '../service/tatum/tatum'
import { Chain, Network } from '../service/tatum/tatum.dto'
import { AddressTransactionNotification, Webhook } from '../service/notification/notification.dto'
import { TestConst } from './e2e.constant'
import { e2eUtil } from './e2e.util'
import { Status } from '../util'
import { TatumPolygonSDK } from '@tatumio/polygon'
import * as process from 'process'
import { Currency } from '@tatumio/api-client'

describe('notification', () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      network: Network.Testnet,
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

  describe('onTransaction', () => {
    it('OK', async () => {

      const fn = {
        testingFn: (webhook: Webhook) => console.log(webhook),
      }
      jest.spyOn(fn, 'testingFn')

      const { data: subscriptions } = await tatum.notification.getAll({ address: TestConst.TEST_ADDRESSES[Chain.Polygon].toLowerCase() })
      const removedSubscriptions = await Promise.all(subscriptions.map(subscription => tatum.notification.unsubscribe(subscription.id)))
      console.log('Removed subscriptions')
      console.log(removedSubscriptions)

      const { error, data } = await tatum.notification.onTransaction({
        address: TestConst.TEST_ADDRESSES[Chain.Polygon],
        chain: Chain.Polygon,
        interval: 5000,
        handle: fn.testingFn,
      })

      if (error) {
        console.log(error)
        throw new Error(error.message[0] as string)
      }

      const tatumSdk = TatumPolygonSDK({ apiKey: process.env.TESTNET_API_KEY as string })
      const txId = await tatumSdk.transaction.send.transferSignedTransaction({
        fromPrivateKey: process.env.TESTNET_POLYGON_PK as string,
        currency: Currency.MATIC,
        to: TestConst.TEST_ADDRESSES[Chain.Polygon],
        amount: '0.0000001',
      })
      console.log(txId)

      for (let i = 0; i < 20; i++) {
        await new Promise(res => setTimeout(res, 5000))
        // @ts-ignore
        if (fn.testingFn.mock.calls.length >= 2) {
          break
        }
      }
      expect(fn.testingFn).toHaveBeenCalledTimes(2)
      await tatum.notification.unsubscribe(data.subscriptionId)

    }, 90000000)
  })

  describe('removeHandler', () => {
    it('OK', async () => {
      const { data: handler } = await tatum.notification.onTransaction({
        address: TestConst.TEST_ADDRESSES[Chain.Polygon],
        chain: Chain.Polygon,
        interval: 5000,
        handle: () => console.log('Test fn'),
      })
      const { status, error, data } = await tatum.notification.removeHandler(handler)
      expect(data).toEqual(undefined)
      expect(error).toEqual(undefined)
      expect(status).toEqual(Status.SUCCESS)
    })
  })
})
