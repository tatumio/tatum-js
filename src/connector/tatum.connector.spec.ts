import { TatumConnector } from './tatum.connector'
import { Container } from 'typedi'
import { CONFIG } from '../util/di.tokens'

describe('TatumConnector', () => {
  Container.set(CONFIG, { apiKey: process.env.TESTNET_API_KEY, testnet: true })
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
