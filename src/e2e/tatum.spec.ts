import { TatumSdk } from '../service/tatum/tatum'

describe('Tatum Init', () => {
  describe('Api Key Auth', () => {
    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        testnet: true,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(true)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        testnet: false,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(false)
    })

    it('Testnet with Mainnet Api Key', async () => {
      await expect(TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        testnet: true,
      })).rejects.toThrow('Tatum API key is not valid for testnet')
    })

    it('Mainnet with Testnet Api Key', async () => {
      await expect(TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        testnet: false,
      })).rejects.toThrow('Tatum API key is not valid for mainnet')
    })

    it('Missing testnet flag', async () => {
      await expect(TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
      })).rejects.toThrow('Testnet flag is required when apiKey is set. Please set it to true or false.')
    })
  })
})
