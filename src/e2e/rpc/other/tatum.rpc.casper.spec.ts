import { Casper, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getCasperRpc = async () => await TatumSDK.init<Casper>(e2eUtil.initConfig(Network.CASPER))

describe.skip('Casper (%s)', () => {
  it('info_get_status', async () => {
    const casper = await getCasperRpc()
    const result = await casper.rpc.infoGetStatus()
    await casper.destroy()
    expect(result.result?.api_version).toBeDefined()
  })

  it('info_get_chainspec', async () => {
    const casper = await getCasperRpc()
    const result = await casper.rpc.infoGetChainspec()
    await casper.destroy()
    expect(result.result?.api_version).toBeDefined()
  })

  it('chain_get_block - height', async () => {
    const casper = await getCasperRpc()
    const result = await casper.rpc.chainGetBlock(3126090)
    await casper.destroy()
    expect(result.result?.block?.header).toBeDefined()
  })

  it('chain_get_block - hash', async () => {
    const casper = await getCasperRpc()
    const result = await casper.rpc.chainGetBlock('086459adc0b4d2e084e6214b34ad8efbc1d4980ca166b22d4d2ee99cee2b3bff')
    await casper.destroy()
    expect(result.result?.block?.header).toBeDefined()
  })
})
