import { TatumSdk } from '../service/tatum/tatum'
import { Chain } from '../service/tatum/tatum.dto'

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

  describe('IP Auth', () => {
    it('Default Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init()
      const nfts = await tatum.nft.getBalance({ chain: Chain.ETH, address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' })
      const contract = nfts.filter(nft => nft.contractAddress === '0x60f80121c31a0d46b5279700f9df786054aa5ee5')
      expect(contract).toHaveLength(1)
    })

    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        testnet: true,
      })
      const nfts = await tatum.nft.getBalance({ chain: Chain.ETH, address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' })
      const contract = nfts.filter(nft => nft.contractAddress === '0x0e4b1a84b504660e0fa473da1f491e5baeb43897')
      expect(contract).toHaveLength(1)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        testnet: false,
      })
      const nfts = await tatum.nft.getBalance({ chain: Chain.ETH, address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' })
      const contract = nfts.filter(nft => nft.contractAddress === '0x60f80121c31a0d46b5279700f9df786054aa5ee5')
      expect(contract).toHaveLength(1)
    })
  })
})
