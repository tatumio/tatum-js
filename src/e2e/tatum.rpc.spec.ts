import { Network, TatumSDK } from '../service'
import { Bitcoin, BitcoinTestnet, Polygon, PolygonMumbai } from '../dto'

describe('RPCs', () => {

  describe('Bitcoin', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<BitcoinTestnet>({network: Network.BITCOIN_TESTNET, verbose: true})
        const info = await sdk.rpc.getBlockChainInfo()
        expect(info.chain).toBe('test')
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<Bitcoin>({network: Network.BITCOIN, verbose: true})
        const info = await sdk.rpc.getBlockChainInfo()
        expect(info.chain).toBe('main')
      })
    })
  })
  describe('Polygon', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<PolygonMumbai>({network: Network.POLYGON_MUMBAI, verbose: true})
        const info = await sdk.rpc.chainId()
        expect(info.toNumber()).toBe(80001)
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<Polygon>({network: Network.POLYGON, verbose: true})
        const info = await sdk.rpc.chainId()
        expect(info.toNumber()).toBe(137)
      })
    })
  })
})
