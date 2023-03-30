import { TatumSdk } from '../service'
import { Blockchain } from '../dto/Blockchain.dto'
import { Utils } from '../util'

jest.setTimeout(50_000)

describe('RPCs', () => {
  describe('RPC init tests', () => {

    it('should init RPC from local hosts', async () => {
      const sdk = await TatumSdk.init({
        verbose: true,
        rpc: { ignoreLoadBalancing: true, bitcoin: { url: ['https://123.com'] } },
      })
      expect(sdk.rpc).toBeDefined()
      // @ts-ignore
      expect(sdk.rpc.activeUrl.get(Blockchain.BITCOIN)).toBe('https://123.com')
      // @ts-ignore
      expect(sdk.rpc.activeUrl.has(Blockchain.LITECOIN)).toBeFalsy()

    })

    it('should init RPC from remote hosts', async () => {
      const sdk = await TatumSdk.init({ verbose: true })
      expect(sdk.rpc).toBeDefined()
      // @ts-ignore
      let activeUrl: Map = sdk.rpc.activeUrl
      expect(activeUrl.has(Blockchain.BITCOIN)).toBeTruthy()
      expect(activeUrl.has(Blockchain.LITECOIN)).toBeTruthy()
      expect(activeUrl.has(Blockchain.ETHEREUM)).toBeTruthy()
      expect(activeUrl.has(Blockchain.POLYGON)).toBeTruthy()
      expect(activeUrl.has(Blockchain.MONERO)).toBeTruthy()
      // @ts-ignore
      const urlMap: Map = sdk.rpc.rpcUrlMap
      expect(urlMap.get(Blockchain.BITCOIN)).not.toHaveLength(0)
      expect(urlMap.get(Blockchain.LITECOIN)).not.toHaveLength(0)
      expect(urlMap.get(Blockchain.ETHEREUM)).not.toHaveLength(0)
      expect(urlMap.get(Blockchain.POLYGON)).not.toHaveLength(0)
      expect(urlMap.get(Blockchain.MONERO)).not.toHaveLength(0)

      await Utils.delay(5_000)
      expect(activeUrl.has(Blockchain.BITCOIN)).toBeTruthy()
      expect(activeUrl.has(Blockchain.LITECOIN)).toBeTruthy()
      expect(activeUrl.has(Blockchain.ETHEREUM)).toBeTruthy()
      expect(activeUrl.has(Blockchain.POLYGON)).toBeTruthy()
      expect(activeUrl.has(Blockchain.MONERO)).toBeTruthy()
    })
  })
})
