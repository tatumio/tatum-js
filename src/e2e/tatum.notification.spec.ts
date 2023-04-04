import {
  AddressEventNotification,
  Chain,
  FailedTxPerBlockChain,
  IncomingFungibleTxChain,
  IncomingInternalTxChain,
  IncomingMultitokenTxChain,
  IncomingNativeTxChain,
  IncomingNftTxChain,
  Network,
  OutgoingFailedTxChain,
  OutgoingFungibleTxChain,
  OutgoingInternalTxChain,
  OutgoingMultitokenTxChain,
  OutgoingNativeTxChain,
  OutgoingNftTxChain,
  PaidFeeChain,
  TatumSDK,
} from '../service'
import { TestConst } from './e2e.constant'
import { e2eUtil } from './e2e.util'
import { Status } from '../util'

describe('notification', () => {
  let tatum: TatumSDK

  beforeAll(async () => {
    tatum = await TatumSDK.init({ network: Network.Testnet, verbose: true, rpc: { ignoreLoadBalancing: true, useStaticUrls: true } })
  })

  describe('createSubscription', () => {

    describe('IP auth', () => {
      describe('Address Event', () => {
        it.each(Object.values(Chain))('OK %s', async (chain: Chain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.addressEvent)
        })
      })

      describe('Incoming Native Tx', () => {
        it.each(Object.values(IncomingNativeTxChain))('OK %s', async (chain: IncomingNativeTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.incomingNativeTx)
        })
      })

      describe('Outgoing Native Tx', () => {
        it.each(Object.values(OutgoingNativeTxChain))('OK %s', async (chain: OutgoingNativeTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingNativeTx)
        })
      })

      describe('Outgoing Failed Tx', () => {
        it.each(Object.values(OutgoingFailedTxChain))('OK %s', async (chain: OutgoingFailedTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingFailedTx)
        })
      })

      describe('Paid Fee', () => {
        it.each(Object.values(PaidFeeChain))('OK %s', async (chain: PaidFeeChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.paidFee)
        })
      })

      describe('Incoming Internal Tx', () => {
        it.each(Object.values(IncomingInternalTxChain))('OK %s', async (chain: IncomingInternalTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.incomingInternalTx)
        })
      })

      describe('Outgoing Internal Tx', () => {
        it.each(Object.values(OutgoingInternalTxChain))('OK %s', async (chain: OutgoingInternalTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingInternalTx)
        })
      })

      describe('Incoming Fungible Tx', () => {
        it.each(Object.values(IncomingFungibleTxChain))('OK %s', async (chain: IncomingFungibleTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.incomingFungibleTx)
        })
      })

      describe('Outgoing Fungible Tx', () => {
        it.each(Object.values(OutgoingFungibleTxChain))('OK %s', async (chain: OutgoingFungibleTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingFungibleTx)
        })
      })

      describe('Incoming Nft Tx', () => {
        it.each(Object.values(IncomingNftTxChain))('OK %s', async (chain: IncomingNftTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.incomingNftTx)
        })
      })

      describe('Outgoing Nft Tx', () => {
        it.each(Object.values(OutgoingNftTxChain))('OK %s', async (chain: OutgoingNftTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingNftTx)
        })
      })

      describe('Incoming Multitoken Tx', () => {
        it.each(Object.values(IncomingMultitokenTxChain))('OK %s', async (chain: IncomingMultitokenTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.incomingMultitokenTx)
        })
      })

      describe('Outgoing Multitoken Tx', () => {
        it.each(Object.values(OutgoingMultitokenTxChain))('OK %s', async (chain: OutgoingMultitokenTxChain) => {
          await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, chain, TestConst.ADDRESSES.TESTNET[chain], tatum.notification.subscribe.outgoingMultitokenTx)
        })
      })

      describe('Failed Txs Per Block', () => {
        it.each(Object.values(FailedTxPerBlockChain))('OK %s', async (chain: FailedTxPerBlockChain) => {
          await e2eUtil.subscriptions.testBlockBasedSubscription(tatum, chain, tatum.notification.subscribe.failedTxsPerBlock)
        })
      })
    })


    it('NOK - existing subscription ', async () => {
      await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.com',
        chain: Chain.Ethereum,
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })

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
    console.log(new Date().toISOString(), error)
    expect(data[0].id).toBeDefined()
    expect(data[0].chain).toBeDefined()
    expect(data[0].address).toBeDefined()
    expect(data[0].url).toBeDefined()
    expect(data[0].type).toBeDefined()
    expect(data.length).toBeGreaterThan(0)
  })

  // TODO pipeline dont work with this test - IP auth
  it.skip('getAllExecutedWebhooks', async () => {
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
