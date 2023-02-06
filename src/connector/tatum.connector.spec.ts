import { TatumConnector } from './tatum.connector'
import { Container } from 'typedi'
import { API_KEY } from '../utils/di.tokens'
import { TestConst } from '../utils/test.constant'

describe('TatumConnector', () => {
  Container.set(API_KEY, TestConst.API_KEY)
  let tatum: TatumConnector
  beforeAll(() => {
    tatum = new TatumConnector()
  })

  it('get', async () => {
    const response = await tatum.get('ethereum/block/current')
    expect(response.data).toBeGreaterThan(0)
  })

  it('post', async () => {
    const response = await tatum.post('ethereum/wallet/priv', {
      index: 1,
      mnemonic: 'inch napkin clap please diet piano belt benefit clever release cherry injury sail faint monitor focus mixed approve around dose method logic concert observe',
    })
    expect(response.data).toBeDefined()
  })
})
