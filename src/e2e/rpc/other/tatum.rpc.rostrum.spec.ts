import { Network, Rostrum, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getRostrumRpc = async () => await TatumSDK.init<Rostrum>(e2eUtil.initConfig(Network.ROSTRUM))

describe('Rostrum', () => {
  it('server.version', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.serverVersion({
      client_name: '1.9.5',
      protocol_version: '0.6',
    })
    await rostrum.destroy()
    expect(result.result).toBeDefined()
    expect(result.result?.length).toEqual(2)
  })

  it('blockchain.headers.tip', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainHeadersTip()
    await rostrum.destroy()
    expect(result.result?.hex).toBeDefined()
    expect(result.result?.height).toBeDefined()
  })

  it('blockchain.headers.subscribe', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainHeadersSubscribe()
    await rostrum.destroy()
    expect(result.result?.hex).toBeDefined()
    expect(result.result?.height).toBeDefined()
  })

  it('blockchain.address.get_balance', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainAddressGetBalance({
      address: 'qrmfkegyf83zh5kauzwgygf82sdahd5a55x9wse7ve',
    })
    await rostrum.destroy()
    expect(result.result?.confirmed).toBeDefined()
    expect(result.result?.unconfirmed).toBeDefined()
  })

  it('blockchain.address.get_history', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainAddressGetHistory({
      address: 'qrmfkegyf83zh5kauzwgygf82sdahd5a55x9wse7ve',
    })
    await rostrum.destroy()
    expect(result.result?.length).toBeGreaterThan(0)
  })

  it('blockchain.block.get', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainBlockGet(800000)
    await rostrum.destroy()
    expect(result.result).toBeDefined()
  })

  it('blockchain.block.header', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainBlockHeader({ height: 800000 })
    await rostrum.destroy()
    expect(result.result).toBeDefined()
  })

  it('blockchain.transaction.get', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.blockchainTransactionGet({
      tx_hash: '05ad7b2bd59e33df49827f2a62002b8f5cccb2a6dc5d96e87089bee9d2f705e2',
    })
    await rostrum.destroy()
    expect(result.result).toBeDefined()
  })

  it('server.banner', async () => {
    const rostrum = await getRostrumRpc()
    const result = await rostrum.rpc.serverBanner()
    await rostrum.destroy()
    expect(result.result).toBeDefined()
  })
})
