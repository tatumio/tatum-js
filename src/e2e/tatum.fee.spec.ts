import { ApiVersion, Network, TatumSDK } from '../service'
import { Bitcoin, Ethereum } from '../service/tatum'
import { Status } from '../util'

describe('Fee', () => {
  it('should return fee for eth testnet', async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const { data, status } = await tatum.fee.getCurrentFee()
    expect(status).toBe(Status.SUCCESS)
    expect(data.gasPrice.fast).toBeDefined()
  })

  it('should return fee for btc testnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const { data, status } = await tatum.fee.getCurrentFee()

    expect(status).toBe(Status.SUCCESS)
    expect(data.fast).toBeDefined()
  })
})
