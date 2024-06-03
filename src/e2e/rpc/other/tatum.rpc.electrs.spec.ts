import { Network, BitcoinElectrs, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getElectrsRpc = async () => await TatumSDK.init<BitcoinElectrs>(e2eUtil.initConfig(Network.BITCOIN_ELECTRS))

describe('Electrs', () => {

  it('blockchain.headers.subscribe', async () => {
    const electrs = await getElectrsRpc()
    const result = await electrs.rpc.blockchainHeadersSubscribe()
    await electrs.destroy()
    expect(result.result?.hex).toBeDefined()
    expect(result.result?.height).toBeDefined()
  })

  it('server.banner', async () => {
    const electrs = await getElectrsRpc()
    const result = await electrs.rpc.serverBanner()
    await electrs.destroy()
    expect(result.result).toBeDefined()
  })
})
