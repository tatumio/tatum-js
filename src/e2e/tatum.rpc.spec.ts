import { Network, TatumSDK } from '../service'
import { Bitcoin, BitcoinTestnet, Polygon, PolygonMumbai } from '../dto'

describe('RPCs', () => {

  describe('Bitcoin', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<BitcoinTestnet>({ network: Network.BITCOIN_TESTNET, verbose: true })
        const info = await sdk.rpc.getBlockChainInfo()
        expect(info.chain).toBe('test')
      })

      it('should get chain info raw batch call', async () => {
        const sdk = await TatumSDK.init<BitcoinTestnet>({ network: Network.BITCOIN_TESTNET, verbose: true })
        const info = await sdk.rpc.rawRpcCall({
          method: 'getblockchaininfo',
          id: '1',
          jsonrpc: '2.0',
        })
        expect(info.result.chain).toBe('test')
      })

      it('should get chain info raw batch call', async () => {
        const sdk = await TatumSDK.init<BitcoinTestnet>({ network: Network.BITCOIN_TESTNET, verbose: true })
        const [info1, info2] = await sdk.rpc.rawBatchRpcCall([
          {
            method: 'getblockchaininfo',
            id: '1',
            jsonrpc: '2.0',
          },
          {
            method: 'getblockchaininfo',
            id: '2',
            jsonrpc: '2.0',
          },
        ])
        expect(info1.result.chain).toBe('test')
        expect(info2.result.chain).toBe('test')
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN, verbose: true })
        const info = await sdk.rpc.getBlockChainInfo()
        expect(info.chain).toBe('main')
      })
    })
  })
  describe('Polygon', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<PolygonMumbai>({ network: Network.POLYGON_MUMBAI, verbose: true })
        const info = await sdk.rpc.chainId()
        expect(info.toNumber()).toBe(80001)
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const sdk = await TatumSDK.init<Polygon>({ network: Network.POLYGON, verbose: true })
        const info = await sdk.rpc.chainId()
        expect(info.toNumber()).toBe(137)
      })

      it('should get chain info raw call', async () => {
        const sdk = await TatumSDK.init<Polygon>({ network: Network.POLYGON, verbose: true })
        const info = await sdk.rpc.rawRpcCall(
          {
            method: 'eth_chainId',
            id: '1',
            jsonrpc: '2.0',
          })
        expect(info.result).toBe('0x89')
      })

      it('should get chain info raw batch call', async () => {
        const sdk = await TatumSDK.init<Polygon>({ network: Network.POLYGON, verbose: true })
        const [info1, info2] = await sdk.rpc.rawBatchRpcCall([
          {
            method: 'eth_chainId',
            id: '1',
            jsonrpc: '2.0',
          },
          {
            method: 'eth_chainId',
            id: '2',
            jsonrpc: '2.0',
          },
        ])
        expect(info1.result).toBe('0x89')
        expect(info2.result).toBe('0x89')
      })
    })
  })
})
