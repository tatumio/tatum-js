import { TatumSdk } from '../service'
import { Network } from '../service'

describe('Tatum Init', () => {
  describe('Api Key Auth', () => {
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

  describe('No Api Key', () => {
    it('Testnet', async () => {
     await TatumSdk.init({
        network: Network.Testnet,
      })
    })

    it('Mainnet', async () => {
      await TatumSdk.init({
        network: Network.Mainnet,
      })
    })

    it('Empty', async () => {
      await TatumSdk.init()
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
