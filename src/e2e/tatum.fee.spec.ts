import { Bitcoin, Ethereum } from '../dto'
import { ApiVersion, Network, TatumSDK } from '../service'

describe('Fee', () => {
  it('should return fee for eth testnet', async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      verbose: true,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const result: any = await tatum.fee.getCurrentFee()
    expect(result.basedOnBlockNumber).toBeDefined()
  })

  it('should return fee for btc testnet', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN_TESTNET,
      verbose: true,
      retryDelay: 1000,
      retryCount: 2,
      version: ApiVersion.V1,
    })

    const result: any = await tatum.fee.getCurrentFee()
    expect(result.basedOnBlockNumber).toBeDefined()
  })
})
