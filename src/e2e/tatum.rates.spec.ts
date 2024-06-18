import { ApiVersion, Ethereum, Network, TatumSDK } from '../service'

describe('Rates', () => {
  let tatum: Ethereum

  beforeEach(async () => {
    tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V4,
      apiKey: process.env.V4_API_KEY_TESTNET,
    })
  })

  afterEach(() => {
    tatum.destroy()
  })

  it('get ETH/EUR', async () => {
    const res = await tatum.rates.getCurrentRate('BTC', 'EUR')
    expect(res.data.value).toBeDefined()
  })
  it('get batch', async () => {
    const res = await tatum.rates.getCurrentRateBatch([
      { currency: 'BTC', basePair: 'EUR' },
      { currency: 'ETH', basePair: 'EUR' },
    ])
    expect(res.data[1].value).toBeDefined()
  })
})
