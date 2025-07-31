import { ApiVersion, Bitcoin, Ethereum, Network, TatumSDK } from '../service'
import { Status } from '../util'

describe('Fee', () => {
  it.skip('should return fee for eth testnet', async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V3,
    })

    try {
      const { data, status } = await tatum.fee.getCurrentFee()

      expect(status).toBe(Status.SUCCESS)
      expect(data.gasPrice.fast).toBeDefined()
    } finally {
      await tatum.destroy()
    }
  })

  it.skip('should return fee for btc testnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V3,
      apiKey: process.env.V3_API_KEY_TESTNET,
    })

    try {
      const { data, status } = await tatum.fee.getCurrentFee()
      console.log({ data, status })
      await tatum.destroy()
      expect(status).toBe(Status.SUCCESS)
      expect(data.fast).toBeDefined()
    } finally {
      await tatum.destroy()
    }
  })
})
