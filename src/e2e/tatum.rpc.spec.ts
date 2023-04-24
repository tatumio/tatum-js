import { Bitcoin, Ethereum, Polygon } from '../dto'
import { Network, TatumSDK } from '../service'

describe('RPCs', () => {
  describe('Bitcoin', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const tatum = await TatumSDK.init<Bitcoin>({
          network: Network.BITCOIN_TESTNET,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.getBlockChainInfo()
        expect(info.chain).toBe('test')
      })

      it('should get chain info raw batch call', async () => {
        const tatum = await TatumSDK.init<Bitcoin>({
          network: Network.BITCOIN_TESTNET,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.rawRpcCall({
          method: 'getblockchaininfo',
          id: '1',
          jsonrpc: '2.0',
        })
        expect(info.result.chain).toBe('test')
      })

      it('should get chain info raw batch call', async () => {
        const tatum = await TatumSDK.init<Bitcoin>({
          network: Network.BITCOIN_TESTNET,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const [info1, info2] = await tatum.rpc.rawBatchRpcCall([
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
        const tatum = await TatumSDK.init<Bitcoin>({
          network: Network.BITCOIN,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.getBlockChainInfo()
        expect(info.chain).toBe('main')
      })
    })
  })
  describe('Polygon', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const tatum = await TatumSDK.init<Polygon>({
          network: Network.POLYGON_MUMBAI,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.chainId()
        expect(info.toNumber()).toBe(80001)
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const tatum = await TatumSDK.init<Polygon>({
          network: Network.POLYGON,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.chainId()
        expect(info.toNumber()).toBe(137)
      })

      it('should get chain info raw call', async () => {
        const tatum = await TatumSDK.init<Polygon>({
          network: Network.POLYGON,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.rawRpcCall({
          method: 'eth_chainId',
          id: '1',
          jsonrpc: '2.0',
        })
        expect(info.result).toBe('0x89')
      })

      it('should get chain info raw batch call', async () => {
        const tatum = await TatumSDK.init<Polygon>({
          network: Network.POLYGON,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const [info1, info2] = await tatum.rpc.rawBatchRpcCall([
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
  describe('Ethereum', () => {
    describe('testnet', () => {
      it('should get chain info', async () => {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM_SEPOLIA,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.chainId()
        expect(info.toNumber()).toBe(11155111)
      })
    })
    describe('mainnet', () => {
      it('should get chain info', async () => {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.chainId()
        expect(info.toNumber()).toBe(1)
      })

      it('should get chain info raw call', async () => {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const info = await tatum.rpc.rawRpcCall({
          method: 'eth_chainId',
          id: '1',
          jsonrpc: '2.0',
        })
        expect(info.result).toBe('0x1')
      })

      it('should get chain info raw batch call', async () => {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM,
          verbose: true,
          retryCount: 1,
          retryDelay: 2000,
        })
        const [info1, info2] = await tatum.rpc.rawBatchRpcCall([
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
        expect(info1.result).toBe('0x1')
        expect(info2.result).toBe('0x1')
      })
    })
  })

  describe('Custom RPC url', () => {
    it('should get chain ID', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM,
        verbose: true,
        rpcUrl: 'https://api.tatum.io/v3/blockchain/node/ethereum-mainnet',
      })
      const info = await tatum.rpc.chainId()
      expect(info.toNumber()).toBe(1)
    })
  })
})
