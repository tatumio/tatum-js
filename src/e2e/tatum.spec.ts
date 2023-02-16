import { TatumSdk } from '../service'
import { Network } from '../service'

describe('Tatum Init', () => {
  describe('Api Key Auth', () => {
    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        network: Network.Testnet,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(true)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        network: Network.Mainnet,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(false)
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
})
