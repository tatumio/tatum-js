import { Network, BitcoinElectrs, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getElectrsRpc = async (testnet: boolean) => await TatumSDK.init<BitcoinElectrs>(e2eUtil.initConfig(testnet ? Network.BITCOIN_ELECTRS_TESTNET : Network.BITCOIN_ELECTRS))

describe.skip.each([
  [true],
  [false]
])('Electrs (%s)', (testnet) => {

  it('blockchain.headers.subscribe', async () => {
    const electrs = await getElectrsRpc(testnet)
    const result = await electrs.rpc.blockchainHeadersSubscribe()
    await electrs.destroy()
    expect(result.result?.hex).toBeDefined()
    expect(result.result?.height).toBeDefined()
  })

  it('server.banner', async () => {
    const electrs = await getElectrsRpc(testnet)
    const result = await electrs.rpc.serverBanner()
    await electrs.destroy()
    expect(result.result).toBeDefined()
  })
})
