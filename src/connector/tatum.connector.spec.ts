import { TatumConnector } from './tatum.connector'
import { Container } from 'typedi'
import { API_KEY } from '../util/di.tokens'
import { TestConst } from '../e2e/e2e.constant'

describe('TatumConnector', () => {
  Container.set(API_KEY, TestConst.TESTNET_API_KEY)
  let tatum: TatumConnector
  beforeAll(() => {
    tatum = new TatumConnector()
  })

  it('get', async () => {
    const response = await tatum.get({ path: 'ethereum/block/current' })
    expect(response).toBeGreaterThan(0)
  })

  it('post', async () => {
    const response = await tatum.post({
      path: 'ethereum/wallet/priv',
      body: {
        index: 1,
        mnemonic: 'inch napkin clap please diet piano belt benefit clever release cherry injury sail faint monitor focus mixed approve around dose method logic concert observe',
      },
    })
    expect(response).toBeDefined()
  })
})
