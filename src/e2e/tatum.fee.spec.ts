import { ApiVersion, Network, TatumSDK } from '../service'
import { Bitcoin, Ethereum } from '../service/tatum'

describe('Fee', () => {
  it('should return fee for eth testnet', async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const result = await tatum.fee.getCurrentFee()
    expect(result.gasPrice.fast).toBeDefined()
  })

  it('should return fee for btc testnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const result = await tatum.fee.getCurrentFee()
    expect(result.fast).toBeDefined()
  })
})
