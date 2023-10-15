import { EVM_BASED_NETWORKS, Network } from '../dto'
import { Bitcoin, TatumSDK } from '../service'
import { TatumUtils } from '../util'

describe('Tatum Init', () => {
  describe('IP auth', () => {
    it('Testnet', async () => {
      const tatum = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN_TESTNET,
      })
      const { result } = await tatum.rpc.getBlockChainInfo()
      expect(result.chain).toBe('test')
      await tatum.destroy()
    })

    it('Mainnet', async () => {
      const tatum = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN,
      })
      const { result } = await tatum.rpc.getBlockChainInfo()
      expect(result.chain).toBe('main')
      await tatum.destroy()
    })
  })

  describe('Multiple Instances', () => {
    it('IP auth', async () => {
      const mainnet = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN,
      })
      const testnet = await TatumSDK.init<Bitcoin>({
        network: Network.BITCOIN_TESTNET,
      })

      const { result: resultMainnet } = await mainnet.rpc.getBlockChainInfo()
      expect(resultMainnet.chain).toBe('main')

      const { result: resultTestnet } = await testnet.rpc.getBlockChainInfo()
      expect(resultTestnet.chain).toBe('test')

      await testnet.destroy()
      await mainnet.destroy()
    })
  })
})
describe('Network to chainId mapping check', () => {
  const networks = Object.values(EVM_BASED_NETWORKS)

  for (const network of networks) {
    it(`${network} should have chainId mapped`, async () => {
      const chainId = TatumUtils.getChainId(network)

      expect(chainId).toBeGreaterThan(0)
      expect(TatumUtils.getNetwork(chainId as number)).toBe(network)
    })
  }
})
