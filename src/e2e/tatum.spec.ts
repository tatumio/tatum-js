import { Chain, Network, TatumSdk } from '../service'
import { e2eUtil } from './e2e.util'
import { TestConst } from './e2e.constant'

describe('Tatum Init', () => {

  describe('IP auth', () => {
    it('Testnet', async () => {
      const tatum = await TatumSdk.init({
        network: Network.Testnet,
        rpc: { ignoreLoadBalancing: true },
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin], tatum.notification.subscribe.addressEvent)
    })

    it('Mainnet', async () => {
      const tatum = await TatumSdk.init({
        network: Network.Mainnet,
        rpc: { ignoreLoadBalancing: true },
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin], tatum.notification.subscribe.addressEvent)
    })

    it('Empty', async () => {
      const tatum = await TatumSdk.init({ rpc: { ignoreLoadBalancing: true } })
      await e2eUtil.subscriptions.testAddressBasedSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin], tatum.notification.subscribe.addressEvent)
    })
  })

  describe('Multiple Instances', () => {
    it('IP auth', async () => {
      const mainnet = await TatumSdk.init({
        network: Network.Mainnet,
        rpc: { ignoreLoadBalancing: true },
      })
      const testnet = await TatumSdk.init({
        network: Network.Testnet,
        rpc: { ignoreLoadBalancing: true },
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(mainnet, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin], mainnet.notification.subscribe.addressEvent)
      await e2eUtil.subscriptions.testAddressBasedSubscription(testnet, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin], testnet.notification.subscribe.addressEvent)
    })
  })
})
