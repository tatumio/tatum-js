import { Network } from '../dto'
import { Bitcoin, TatumSDK } from '../service'
import { e2eUtil } from './e2e.util'

describe('Tatum Init', () => {
  describe('IP auth', () => {
    it('Testnet', async () => {
      const tatum = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN_TESTNET,
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(
        tatum,
        e2eUtil.subscriptions.getAddress(Network.BITCOIN_TESTNET),
        tatum.notification.subscribe.addressEvent,
      )
    })

    it('Mainnet', async () => {
      const tatum = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN,
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(
        tatum,
        e2eUtil.subscriptions.getAddress(Network.BITCOIN),
        tatum.notification.subscribe.addressEvent,
      )
    })

    it('Empty', async () => {
      const tatum = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN })
      await e2eUtil.subscriptions.testAddressBasedSubscription(
        tatum,
        e2eUtil.subscriptions.getAddress(Network.BITCOIN),
        tatum.notification.subscribe.addressEvent,
      )
    })
  })

  describe('Multiple Instances', () => {
    it('IP auth', async () => {
      const mainnet = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN,
      })
      const testnet = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN_TESTNET,
      })
      await e2eUtil.subscriptions.testAddressBasedSubscription(
        mainnet,
        e2eUtil.subscriptions.getAddress(Network.BITCOIN),
        mainnet.notification.subscribe.addressEvent,
      )
      await e2eUtil.subscriptions.testAddressBasedSubscription(
        testnet,
        e2eUtil.subscriptions.getAddress(Network.BITCOIN_TESTNET),
        testnet.notification.subscribe.addressEvent,
      )
    })
  })
})
