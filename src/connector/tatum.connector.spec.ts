import { TatumConnector } from './tatum.connector'

describe('TatumConnector', () => {
  let tatum: TatumConnector
  beforeAll(() => {
    tatum = new TatumConnector('c53da34e-114d-4961-9030-d1a720a0ec38')
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
