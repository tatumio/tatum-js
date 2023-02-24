import { Chain, Network, TatumSdk } from '../service'
import { e2eUtil } from './e2e.util'
import { TestConst } from './e2e.constant'

describe('Tatum Init', () => {
  describe('API Key Auth', () => {
    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        network: Network.Testnet,
      })

      const { data } = await tatum.getApiInfo()
      expect(data.testnet).toBe(true)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        network: Network.Mainnet,
      })
      const { data } = await tatum.getApiInfo()
      expect(data.testnet).toBe(false)
    })

    it('Testnet with Mainnet Api Key', async () => {
      await expect(
        TatumSdk.init({
          apiKey: process.env.MAINNET_API_KEY,
          network: Network.Testnet,
        }),
      ).rejects.toThrow('Tatum API key is not valid for Testnet')
    })

    it('Mainnet with Testnet Api Key', async () => {
      await expect(
        TatumSdk.init({
          apiKey: process.env.TESTNET_API_KEY,
          network: Network.Mainnet,
        }),
      ).rejects.toThrow('Tatum API key is not valid for Mainnet')
    })
  })

  describe('IP auth', () => {
    it('Testnet', async () => {
      const tatum = await TatumSdk.init({
        network: Network.Testnet,
      })
      await e2eUtil.subscriptions.testCreateSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin])
    })

    it('Mainnet', async () => {
      const tatum = await TatumSdk.init({
        network: Network.Mainnet,
      })
      await e2eUtil.subscriptions.testCreateSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin])
    })

    it('Empty', async () => {
      const tatum = await TatumSdk.init()
      await e2eUtil.subscriptions.testCreateSubscription(tatum, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin])
    })
  })

  describe('Multiple Instances', () => {
    it('IP auth', async () => {
      const mainnet = await TatumSdk.init({
        network: Network.Mainnet,
      })
      const testnet = await TatumSdk.init({
        network: Network.Testnet,
      })
      await e2eUtil.subscriptions.testCreateSubscription(mainnet, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin])
      await e2eUtil.subscriptions.testCreateSubscription(testnet, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin])
    })

    it('API Key auth', async () => {
      const mainnet = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        network: Network.Mainnet,
      })
      const testnet = await TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        network: Network.Testnet,
      })
      await e2eUtil.subscriptions.testCreateSubscription(mainnet, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin])
      await e2eUtil.subscriptions.testCreateSubscription(testnet, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin])
    })

    it('IP auth and API Key auth', async () => {
      const mainnet = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        network: Network.Mainnet,
      })
      const testnet = await TatumSdk.init({
        network: Network.Testnet,
      })
      await e2eUtil.subscriptions.testCreateSubscription(mainnet, Chain.Bitcoin, TestConst.ADDRESSES.MAINNET[Chain.Bitcoin])
      await e2eUtil.subscriptions.testCreateSubscription(testnet, Chain.Bitcoin, TestConst.ADDRESSES.TESTNET[Chain.Bitcoin])
    })
  })

  describe('Invalid Api Key', () => {
    it('Invalid', async () => {
      await expect(
        TatumSdk.init({
          apiKey: 'invalid-api-key',
        }),
      ).rejects.toThrow(/^Unable to find valid subscription for/)
    })
  })
})
