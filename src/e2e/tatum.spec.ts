import { Network } from '../dto'
import { Bitcoin, TatumSDK } from '../service'
import { ApiKey } from './e2e.constant'

describe('Tatum Init', () => {
  it('Testnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      apiKey: ApiKey.testnet,
    })
    const { result } = await tatum.rpc.getBlockChainInfo()
    expect(result.chain).toBe('test')
    await tatum.destroy()
  })

  it('Mainnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN,
      apiKey: ApiKey.mainnet,
    })
    const { result } = await tatum.rpc.getBlockChainInfo()
    expect(result.chain).toBe('main')
    await tatum.destroy()
  })

  it('Multiple Instances', async () => {
    const mainnet = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN,
      apiKey: ApiKey.mainnet,
    })
    const testnet = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      apiKey: ApiKey.testnet,
    })

    const { result: resultMainnet } = await mainnet.rpc.getBlockChainInfo()
    expect(resultMainnet.chain).toBe('main')

    const { result: resultTestnet } = await testnet.rpc.getBlockChainInfo()
    expect(resultTestnet.chain).toBe('test')

    await testnet.destroy()
    await mainnet.destroy()
  })
})
