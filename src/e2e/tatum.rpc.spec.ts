import { TatumSDK } from '../service'
import { Blockchain } from '../dto'

jest.setTimeout(50_000)

describe('RPCs', () => {
  describe('RPC init tests', () => {

    it('should init RPC from local hosts', async () => {
      const sdk = await TatumSDK.init({
        verbose: true,
        rpc: { ignoreLoadBalancing: true, bitcoin: { url: ['https://123.com'] } },
      })
      expect(sdk.rpc).toBeDefined()
      // @ts-ignore
      expect(sdk.rpc.activeUrl.get(Blockchain.BITCOIN)).toMatchObject({ url: 'https://123.com', index: -1 })
      // @ts-ignore
      expect(sdk.rpc.activeUrl.has(Blockchain.LITECOIN)).toBeFalsy()

    })

    it('should init RPC from remote hosts', async () => {
      const sdk = await TatumSDK.init({
        verbose: true, rpc: {
          oneTimeLoadBalancing: true,
          waitForFastestNode: true,
        },
      })
      expect(sdk.rpc).toBeDefined()
      // @ts-ignore
      let activeUrl: Map = sdk.rpc.activeUrl
      expect(activeUrl.has(Blockchain.BITCOIN)).toBeFalsy()
      expect(activeUrl.has(Blockchain.LITECOIN)).toBeFalsy()
      expect(activeUrl.has(Blockchain.ETHEREUM)).toBeFalsy()
      expect(activeUrl.has(Blockchain.POLYGON)).toBeFalsy()
      expect(activeUrl.has(Blockchain.MONERO)).toBeFalsy()
      // @ts-ignore
      const urlMap: Map = sdk.rpc.rpcUrlMap
      expect(urlMap.has(Blockchain.BITCOIN)).toBeFalsy()
      expect(urlMap.has(Blockchain.LITECOIN)).toBeFalsy()
      expect(urlMap.has(Blockchain.ETHEREUM)).toBeFalsy()
      expect(urlMap.has(Blockchain.POLYGON)).toBeFalsy()
      expect(urlMap.has(Blockchain.MONERO)).toBeFalsy()

      await sdk.rpc.bitcoin.callRpc({ method: 'getblockchaininfo', params: [], id: 1, jsonrpc: '2.0' })
      expect(activeUrl.has(Blockchain.BITCOIN)).toBeTruthy()
      expect(activeUrl.has(Blockchain.LITECOIN)).toBeFalsy()
      expect(activeUrl.has(Blockchain.ETHEREUM)).toBeFalsy()
      expect(activeUrl.has(Blockchain.POLYGON)).toBeFalsy()
      expect(activeUrl.has(Blockchain.MONERO)).toBeFalsy()
    })
  })
})
